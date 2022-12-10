import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    findAll(): Promise<Role[]> {
      return this.rolesService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Role> {
      return this.rolesService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
        if (updateRoleDto['id']) {
            throw new BadRequestException(`Changing Role ID is not allowed`)
        }
        return this.rolesService.update(id, updateRoleDto);
    }

    @Post()
    create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
      return this.rolesService.create(createRoleDto);
    }

}
