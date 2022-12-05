"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessUpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
class SuccessUpdateUserDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_user_dto_1.CreateUserDto, ['password', 'roleId'])) {
}
exports.SuccessUpdateUserDto = SuccessUpdateUserDto;
//# sourceMappingURL=success-update-user.dto.js.map