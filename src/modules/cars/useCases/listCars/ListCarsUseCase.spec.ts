import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new  CarsRepositoryInMemory()
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car1", 
            "description": "Car description", 
            "daily_rate": 110.00, 
            "license_plate": "DEF-1234", 
            "fine_amount": 40.00,  
            "brand": "Car_brand",
            "category_id": "category_id"
        })

        const cars = await listCarsUseCase.execute()
        console.log(cars)

        expect(cars).toEqual([car])

    }) 

})