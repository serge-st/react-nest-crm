import { Column, Entity, PrimaryColumn } from "typeorm";

const UserRoles = {
    admin: 'Administrator',
    manager: 'Manager',
} as const;

export type UserRoleId = keyof typeof UserRoles;
type UserRoleDescription = typeof UserRoles[UserRoleId];

@Entity()
export class UserRole {
    @PrimaryColumn()
    id: UserRoleId;

    @Column()
    description: UserRoleDescription;

    @Column("text", { array: true, nullable: true })
    forbiddenRoutes: string[];
}