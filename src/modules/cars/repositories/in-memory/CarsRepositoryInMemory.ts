import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];
    
    // Create 
    async create({
        brand, 
        category_id, 
        daily_rate, 
        description, 
        fine_amount, 
        name, 
        license_plate,
    }: ICreateCarDTO): Promise<Car> {
        
        const car = new Car()

        Object.assign(car, {
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            name, 
            license_plate
        })

        this.cars.push(car)

        return car

    }

    // findByLicensePlate
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.cars.find((car) => car.license_plate === license_plate) 
    }

    async findAvailable(): Promise<Car[]> {
        const cars = this.cars.filter((car) => car.available === true ) 
        return cars
    }

}

export { CarsRepositoryInMemory }