import { CreateUserDto } from "./create-user.dto";
declare const UpdateUserPasswordDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUserDto, "password">>;
export declare class UpdateUserPasswordDto extends UpdateUserPasswordDto_base {
}
export {};
