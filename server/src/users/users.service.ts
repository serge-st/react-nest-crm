import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userRole.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>
  ) {
    // Prefill table with roles
    const admin = this.userRolesRepository.create({id: 'admin', description: 'Administrator', forbiddenRoutes: []});
    const manager = this.userRolesRepository.create({id: 'manager', description: 'Manager', forbiddenRoutes: ['/users']});
    this.userRolesRepository.save(admin);
    this.userRolesRepository.save(manager);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {username, password, roleId, isEnabled, fullName, email} = createUserDto;

    const [role] = await this.userRolesRepository.find({where: {id: roleId}});

    const newUser = this.usersRepository.create({
      username,
      password,
      roleId: role,
      isEnabled,
      fullName,
      email,
    });

    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({loadRelationIds: true});
  }

  async findOne(id: number): Promise<User[]> {
    const user = await this.usersRepository.find({loadRelationIds: true, where: {id: id}});
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
  }
}
