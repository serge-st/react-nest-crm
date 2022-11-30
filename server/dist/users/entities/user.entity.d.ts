import { UserRole } from "./userRole.entity";
export declare class User {
    id: string;
    username: string;
    password: string;
    roleId: UserRole;
    isEnabled: boolean;
    fullName: string;
    email: string;
}
