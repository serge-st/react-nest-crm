import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SuccessCreateUserDto } from './dto/success-create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { SuccessUpdateUserDto } from './dto/success-update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<SuccessCreateUserDto>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updatePassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<SuccessUpdateUserDto>;
    remove(id: string): Promise<void>;
}
