import { RoleId } from "src/roles/entities/role.entity";
export interface JwtPayload {
    username: string;
    role: RoleId;
}
