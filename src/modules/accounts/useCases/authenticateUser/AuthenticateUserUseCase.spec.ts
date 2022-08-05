import { AppError } from "@errors/AppError"
import { ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { User } from "../../entities/User"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

let createUserUseCase: CreateUserUseCase

// git teste de dados
/// outro testye de envio a commit


describe("Authenticate User", () => {
  
    beforeEach(() => {

        usersRepositoryInMemory = new UsersRepositoryInMemory() 
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

    }) 

    it("should be able to authenticate an user", async () => {

        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@teste.com",
            password: "1234",
            name: "User Test"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        //console.log(result)

        expect(result).toHaveProperty("token")

    })
    
    it("should be able to authenticate an nonexists user", () => {

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            })
        }).rejects.toBeInstanceOf(AppError)

    })

    it("should not be able to authenticate with incorrect password", () => {

        expect(async () => {

            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "user@user.com",
                password: "1234",
                name: "User Test Error"
            }

            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectpassword"
            }) 

        }).rejects.toBeInstanceOf(AppError)

    })

})