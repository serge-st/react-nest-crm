declare const UserRoles: {
    readonly admin: "Administrator";
    readonly manager: "Manager";
};
type UserId = keyof typeof UserRoles;
type UserDescription = typeof UserRoles[UserId];
export declare class UserRole {
    id: UserId;
    description: UserDescription;
    forbiddenRoutes: string[];
}
export {};
