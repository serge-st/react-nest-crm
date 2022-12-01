declare const UserRoles: {
    readonly admin: "Administrator";
    readonly manager: "Manager";
};
export type UserRoleId = keyof typeof UserRoles;
type UserRoleDescription = typeof UserRoles[UserRoleId];
export declare class UserRole {
    id: UserRoleId;
    description: UserRoleDescription;
    forbiddenRoutes: string[];
}
export {};
