import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

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

    async findById(id: string): Promise<Role> {
        const role = await this.rolesRepository.findOne({where: {id}});
        if (!role) {
            throw new NotFoundException(`Role '${id}' was not found`);
        }
        return role;
    }

    async findAll(): Promise<Role[]> {
        return await this.rolesRepository.find();
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const foundRole = await this.findById(id);
        const updatedRole = this.rolesRepository.create({
            ...foundRole,
            ...updateRoleDto,
        })
        return await this.rolesRepository.save(updatedRole);
    }
}
