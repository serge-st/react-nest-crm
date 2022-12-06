import { Repository } from 'typeorm';
import { Role, RoleId } from './entities/role.entity';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    findOne(id: RoleId): Promise<Role>;
}
