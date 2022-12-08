import { RouteType } from "src/app.service";
import { Column, Entity, PrimaryColumn } from "typeorm";

export const Roles = {
    admin: 'Administrator',
    manager: 'Manager',
} as const;

export type RoleId = keyof typeof Roles;
type RoleDescription = typeof Roles[RoleId];

@Entity('roles')
export class Role {
    @PrimaryColumn()
    id: RoleId;

    @Column()
    description: RoleDescription;

    @Column("text", {array: true, default: []})
    forbiddenRoutes: RouteType[]
}