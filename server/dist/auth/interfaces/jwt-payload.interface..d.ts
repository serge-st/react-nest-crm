import { UserRole } from "src/users/entities/userRole.entity";
export interface JwtPayload {
    username: string;
    role: UserRole;
}
