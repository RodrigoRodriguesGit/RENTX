import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { inject, injectable } from "tsyringe";

interface IRequest {
    category_id?: string,
    brand?: string,
    name?: string
}

@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("CarsRepository")
        private CarsRepository: ICarsRepository
    ) {}

    async execute({category_id, brand, name}: IRequest): Promise<Car[]> {
        const cars = await this.CarsRepository.findAvailable(brand, category_id, name)
        return cars
    }

}

export { ListAvailableCarsUseCase }