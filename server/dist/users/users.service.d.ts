import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userRole.entity';
export declare class UsersService {
    private usersRepository;
    private userRolesRepository;
    constructor(usersRepository: Repository<User>, userRolesRepository: Repository<UserRole>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User[]>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): Promise<void>;
}
