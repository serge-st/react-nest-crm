import { UserRole } from '../entities/userRole.entity';
import { CreateUserDto } from './create-user.dto';
declare const SuccessUpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateUserDto, "password" | "roleId">>>;
export declare class SuccessUpdateUserDto extends SuccessUpdateUserDto_base {
    roleId: UserRole;
}
export {};
