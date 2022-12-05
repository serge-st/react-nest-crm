import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessCreateUserDto } from './dto/success-create-user.dto';
import { SuccessUpdateUserDto } from './dto/success-update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userRole.entity';
import passwordHasher from './helpers/passwordHasher';

enum DBErrorCode {
  duplicateName = '23505',
}

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,

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

  async create(createUserDto: CreateUserDto): Promise<SuccessCreateUserDto> {
    const {username, password, roleId, isEnabled, fullName, email} = createUserDto;

    const hashedPassword = await passwordHasher(+this.configService.get('BCRYPT_SALT_ROUNDS'), password);

    const [role] = await this.userRolesRepository.find({where: {id: roleId}});

    const newUser = this.usersRepository.create({
      password: hashedPassword,
      roleId: role,
      username,
      isEnabled,
      fullName,
      email,
    });

    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
        // '23505' is error code returned when username already exists in the DB
        // because the password @Column decorator has { unique: true, } option
        if (error.code === DBErrorCode.duplicateName) {
          throw new ConflictException(`Username '${username}' already exists`)
        } else {
          throw new InternalServerErrorException();
        }
    }
    
    return {
      id: newUser.id,
      username: newUser.username,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({loadRelationIds: true});
  }

  async findById(id: number): Promise<User> {
    const [user] = await this.usersRepository.find({loadRelationIds: true, where: { id }});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [user] = await this.usersRepository.find({loadRelationIds: true, where: { username }});
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const foundUser = await this.findById(id);

    if (updateUserDto.roleId) {
      const [role] = await this.userRolesRepository.find({where: {id: updateUserDto.roleId}});
      foundUser.roleId = role;
    }

    const {roleId, ...restUpdatedValues} = updateUserDto;

    const updatedUser = {
      ...foundUser,
      ...restUpdatedValues,
    }

    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async updatePassword(id: number, updateUserPasswordDto: UpdateUserPasswordDto): Promise<SuccessUpdateUserDto> {
    const foundUser = await this.findById(id);
    const {password} = updateUserPasswordDto;

    const hashedPassword = await passwordHasher(+this.configService.get('BCRYPT_SALT_ROUNDS'), password);

    const updatedUser = {
      ...foundUser,
      password: hashedPassword,
    }

    const result = await this.usersRepository.save(updatedUser);
    const {password: pwd, ...updateResult} = result;
    return updateResult;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
  }
}
