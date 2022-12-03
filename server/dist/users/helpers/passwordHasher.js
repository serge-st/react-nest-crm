"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const passwordHasher = async (saltRounds, password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
exports.default = passwordHasher;
//# sourceMappingURL=passwordHasher.js.map