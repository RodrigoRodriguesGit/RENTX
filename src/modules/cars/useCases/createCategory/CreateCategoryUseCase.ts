import { inject, injectable } from "tsyringe"
import { AppError } from "@errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";

interface IRequest {
    name: string; 
    description: string;
}

@injectable()
class CreateCategoryUseCase {
  
  constructor (
    @inject(CategoriesRepository)
    private categoriesRepository: ICategoriesRepository
    ) {}

  async execute( {name, description}: IRequest ): Promise<void> {
      
      console.log('Nome Categoria:' + name);

     const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

     if (categoryAlreadyExists) {
         throw new AppError("Caterogy Already Exists!");
     }

     this.categoriesRepository.create({name, description});

  }

}

export { CreateCategoryUseCase } 