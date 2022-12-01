import { UserRole } from "./userRole.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    roleId: UserRole;
    isEnabled: boolean;
    fullName: string;
    email: string;
}
