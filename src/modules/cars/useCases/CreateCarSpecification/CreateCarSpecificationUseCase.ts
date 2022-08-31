import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository"
import { AppError } from "@shared/errors/AppError"

interface IRequest {
    car_id: string,
    specifications_id: string[],
}

class CreateCarSpecificationUseCase {

    constructor(
        private carRepository: ICarsRepository,
        private specificationsRepository: ISpecificationRepository
    ){}

    async execute({car_id, specifications_id}: IRequest): Promise<void> {

        const carExists = await this.carRepository.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exists!")
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id)

        carExists.specifications = specifications 

        await this.carRepository.create(carExists)

        console.log(carExists)

    }

}

export { CreateCarSpecificationUseCase }