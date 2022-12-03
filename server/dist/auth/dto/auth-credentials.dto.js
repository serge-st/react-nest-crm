"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("../../users/dto/create-user.dto");
class AuthCredentialsDto extends (0, mapped_types_1.PickType)(create_user_dto_1.CreateUserDto, ['username', 'password']) {
}
exports.AuthCredentialsDto = AuthCredentialsDto;
//# sourceMappingURL=auth-credentials.dto.js.map