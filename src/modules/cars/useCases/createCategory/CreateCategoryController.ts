import { Response, Request } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { container } from "tsyringe"
import { SimpleConsoleLogger } from "typeorm";

class CreateCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        
        console.log("Reload Funcionando Teste!")

        const { name , description } = request.body;
    
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        await createCategoryUseCase.execute({name, description});
    
        return response.status(201).send();
    
    }

}

export { CreateCategoryController };