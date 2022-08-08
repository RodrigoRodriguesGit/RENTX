import { getRepository, Repository } from 'typeorm';
import { Category } from '../entities/Category';
import { 
    ICategoriesRepository, 
    ICreateCategoryDTO 
} from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>

    constructor() {
        this.repository = getRepository(Category);
    }

    // Cria a Categoria
    async create ({name, description}: ICreateCategoryDTO): Promise<void> {

        const category = this.repository.create({
            description, 
            name
        });

        await this.repository.save(category)

    }

    // Lista as Categorias
    async list(): Promise<Category[]> {        
        const categories = this.repository.find();
        return categories
    }

    // Só retorna uma Categoria
    async findByName (name: string): Promise<Category> {

        const category = await this.repository.findOne({name});
        return category;

    }

}

export { CategoriesRepository }