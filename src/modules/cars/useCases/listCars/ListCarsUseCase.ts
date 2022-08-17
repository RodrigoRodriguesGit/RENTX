import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class ListCarsUseCase {

    constructor(
        private CarRepository: ICarsRepository
    ) {}

    async execute(): Promise<Car[]> {
        const cars = await this.CarRepository.findAvailable()
        return cars
    }

}

export { ListCarsUseCase }