import { RoleId } from "src/roles/entities/role.entity";

export interface JWTPayload {
    username: string;
    role: RoleId;
}