import { Role } from "src/roles/entities/role.entity";

export interface JWTPayload {
    username: string;
    role: Role;
}