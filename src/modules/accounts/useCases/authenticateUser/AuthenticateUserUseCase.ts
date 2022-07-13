import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string, 
    };
    token: string
}

@injectable()
class AuthenticateUserUseCase {
        
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository 
    ){}

    async execute({email, password}: IRequest): Promise<IResponse> {
        
        // Usuário Existe 
        const user = await this.usersRepository.findByEmail(email)

        if (!user){
            throw new Error("E-mail or password incorret")
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password)
        
        if (!passwordMatch){
            throw new Error("E-mail or password incorret")
        }

        const token = sign({}, "f34fa5ab9805c87d7a19050d14486e82", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token, 
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn

    }
}

export { AuthenticateUserUseCase }