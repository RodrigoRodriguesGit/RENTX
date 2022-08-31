import { getRepository, Repository } from 'typeorm';
import { Specification } from '../entities/Specification';
import { 
    ICreateSpecificationDTO, 
    ISpecificationRepository 
} from '@modules/cars/repositories/ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }

    // Cria a Categoria
    async create ({name, description}: ICreateSpecificationDTO): Promise<Specification> {
        
        const specification = this.repository.create({
            description,
            name
        });
        
        await this.repository.save(specification);

    }

    async findByName (name: string): Promise<Specification> {
        const specifications = this.repository.findOne({
            name,
            })
        return specifications;
    }

    findByIds(ids: string[]): Promise<Specification[]> {
        throw new Error('Method not implemented.');
    }

}

export { SpecificationRepository }