import { Role } from "../../roles/entities/role.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    role: Role;
    isEnabled: boolean;
    fullName: string;
    email: string;
}
