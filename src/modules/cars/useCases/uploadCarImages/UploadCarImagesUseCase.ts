import { inject, injectable } from "tsyringe"

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository"

interface IRequest {
    car_id: string,
    imagens_name: string[]        
}

@injectable()
class UploadCarImagesUseCase {

    constructor(
        @inject("CarsImagesRepository")
        private CarsImagesRepository: ICarsImagesRepository
    ) {}

    async execute({car_id, imagens_name}: IRequest): Promise<void> {

        imagens_name.map( async (image) => {
            await this.CarsImagesRepository.create(car_id, image)
        })

    }

}

export { UploadCarImagesUseCase } 