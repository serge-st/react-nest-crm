import { UserRoleId } from "../entities/userRole.entity";
export declare class CreateUserDto {
    username: string;
    password: string;
    role: UserRoleId;
    isEnabled?: boolean;
    fullName?: string;
    email?: string;
}
