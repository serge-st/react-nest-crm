export declare const Roles: {
    readonly admin: "Administrator";
    readonly manager: "Manager";
};
export type RoleId = keyof typeof Roles;
type RoleDescription = typeof Roles[RoleId];
export declare class Role {
    id: RoleId;
    description: RoleDescription;
}
export {};
