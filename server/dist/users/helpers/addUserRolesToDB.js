"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addUserRolesToDB = (createEntry, saveEntry) => {
    const roles = [];
    roles.push(createEntry({ id: 'admin', description: 'Adinistrator', forbiddenRoutes: [] }));
    console.log(roles);
};
exports.default = addUserRolesToDB;
//# sourceMappingURL=addUserRolesToDB.js.map