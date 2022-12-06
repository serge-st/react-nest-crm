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
        const admin = this.rolesRepository.create({id: 'admin', description: 'Administrator'});
        const manager = this.rolesRepository.create({id: 'manager', description: 'Manager'});
        this.rolesRepository.save(admin);
        this.rolesRepository.save(manager);
    }

    async findOne(id: RoleId): Promise<Role> {
        return await this.rolesRepository.findOne({where: {id}});
    }
}
