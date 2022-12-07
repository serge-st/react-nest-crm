import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import passwordHasher from './helpers/passwordHasher';
import { RolesService } from 'src/roles/roles.service';
import { DbErrorCode } from 'src/db-error-code.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
    private configService: ConfigService,

    private rolesService: RolesService,
  ) {
    // Prefill table with test users:
    const prefil = async () => {
      const testUser = await this.usersRepository.findOne({where: {username: 'myadmin'}});
      if (!testUser) {
        const roleA = await this.rolesService.findOne('admin');
        const passwordA = await passwordHasher(4, 'Testing1');
        const admin = this.usersRepository.create({username: 'myadmin', password: passwordA, role: roleA})
        await this.usersRepository.save(admin);

        const roleM = await this.rolesService.findOne('manager');
        const passwordM = await passwordHasher(4, 'Testing1');
        const manager = this.usersRepository.create({username: 'mymanager', password: passwordM, role: roleM})
        await this.usersRepository.save(manager);
      }
    }
    prefil();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {password, role: roleId, username} = createUserDto;
    const hashedPassword = await passwordHasher(+this.configService.get('BCRYPT_SALT_ROUNDS'), password);
    const role = await this.rolesService.findOne(roleId);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role,
    });

    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
        // '23505' is error code returned when username already exists in the DB
        // because the password @Column decorator has { unique: true, } option
        if (error.code === DbErrorCode.duplicateName) {
          throw new ConflictException(`Username '${username}' already exists`)
        } else {
          throw new InternalServerErrorException();
        }
    }
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    const [user] = await this.usersRepository.find({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [user] = await this.usersRepository.find({ where: { username } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const foundUser = await this.findById(id);

    if (updateUserDto.role) {
      const role = await this.rolesService.findOne(updateUserDto.role);
      foundUser.role = role;
    }

    const {role: roleId, ...restUpdatedValues} = updateUserDto;
    const updatedUser = this.usersRepository.create({
      ...foundUser,
      ...restUpdatedValues,
    });
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  async updatePassword(id: number, updateUserPasswordDto: UpdateUserPasswordDto): Promise<User> {
    const foundUser = await this.findById(id);
    const {password} = updateUserPasswordDto;
    const hashedPassword = await passwordHasher(+this.configService.get('BCRYPT_SALT_ROUNDS'), password);

    const updatedUser = this.usersRepository.create({
      ...foundUser,
      password: hashedPassword,
    });
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
  }
}
