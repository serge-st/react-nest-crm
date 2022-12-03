"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessCreateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
class SuccessCreateUserDto extends (0, mapped_types_1.PickType)(create_user_dto_1.CreateUserDto, ['username']) {
}
exports.SuccessCreateUserDto = SuccessCreateUserDto;
//# sourceMappingURL=success-create-user.dto.js.map