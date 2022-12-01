import { UserRoleId } from "../entities/userRole.entity";

export class CreateUserDto {
    username: string;
    password: string;
    roleId: UserRoleId;
    isEnabled?: boolean;
    fullName?: string;
    email?: string;
}
