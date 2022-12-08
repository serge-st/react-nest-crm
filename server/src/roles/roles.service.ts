import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, RoleId } from './entities/role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>
    ) {
        // Prefil tables with values:
        const prefil = async () => {
            const testRole = await this.rolesRepository.findOne({where: {id: 'admin'}});
            if (!testRole) {
                const admin = this.rolesRepository.create({id: 'admin', description: 'Administrator', forbiddenRoutes: []});
                const manager = this.rolesRepository.create({id: 'manager', description: 'Manager', forbiddenRoutes: ['* /users']});
                await this.rolesRepository.save(admin);
                await this.rolesRepository.save(manager);
            }
        }
        prefil()
    }

    async findOne(id: RoleId): Promise<Role> {
        return await this.rolesRepository.findOne({where: {id}});
    }
}
