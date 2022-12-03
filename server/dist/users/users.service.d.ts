import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessCreateUserDto } from './dto/success-create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userRole.entity';
export declare class UsersService {
    private usersRepository;
    private userRolesRepository;
    constructor(usersRepository: Repository<User>, userRolesRepository: Repository<UserRole>);
    create(createUserDto: CreateUserDto): Promise<SuccessCreateUserDto>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
