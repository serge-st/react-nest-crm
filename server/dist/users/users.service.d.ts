import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from 'src/roles/roles.service';
export declare class UsersService {
    private usersRepository;
    private configService;
    private rolesService;
    constructor(usersRepository: Repository<User>, configService: ConfigService, rolesService: RolesService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    updatePassword(id: number, updateUserPasswordDto: UpdateUserPasswordDto): Promise<User>;
    remove(id: number): Promise<void>;
}
