import { Column, Entity, PrimaryColumn } from "typeorm";

const UserRoles = {
    admin: 'Administrator',
    manager: 'Manager',
} as const;

type UserId = keyof typeof UserRoles;
type UserDescription = typeof UserRoles[UserId];

@Entity()
export class UserRole {
    @PrimaryColumn()
    id: UserId;

    @Column()
    description: UserDescription;

    @Column()
    forbiddenRoutes: string[];
}