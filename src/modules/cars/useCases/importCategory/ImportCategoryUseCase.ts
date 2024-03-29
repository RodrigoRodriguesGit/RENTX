//import fs from 'fs'
import fs from 'fs';
import { parse } from 'csv-parse';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

import { inject, injectable } from 'tsyringe';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject)  => {

            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = parse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) =>
            { 
                const [name, description] = line 
                categories.push({name, description})
            })
            .on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            })
            .on("error", (err) => {
                reject(err);
            })
        })
    };

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file)
        console.log(categories)

        categories.map(async category => {
            const { name, description} = category;

            const existsCategory = await this.categoryRepository.findByName(name);

            if (!existsCategory) {
                await this.categoryRepository.create({
                    name, description
                })
            }

        })
    }

}

export { ImportCategoryUseCase }