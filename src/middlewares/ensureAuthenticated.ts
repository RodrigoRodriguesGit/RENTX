import { NextFunction, Request, Response} from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

interface IPayLoad {
    sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const autHeader = request.headers.authorization

    if (!autHeader) {
        throw new AppError("Token missing", 401)
    }

    //Bearer "token"
    //[0] - Bearer
    //[1] - token
    const [, token] = autHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "f34fa5ab9805c87d7a19050d14486e82") as IPayLoad
        
        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if (!user){
            throw new AppError("User do not exists!", 401)   
        }

        request.user = {
            id: user_id 
        }

        next();
    } catch {
        throw new AppError("Invalid Token!", 401)
    }
       
}