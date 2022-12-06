import { RoleId } from "../../roles/entities/role.entity";
export declare class CreateUserDto {
    username: string;
    password: string;
    role: RoleId;
    isEnabled?: boolean;
    fullName?: string;
    email?: string;
}
