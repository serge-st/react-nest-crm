import { CreateUserDto } from "./create-user.dto";
declare const SuccessCreateUserDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUserDto, "username">>;
export declare class SuccessCreateUserDto extends SuccessCreateUserDto_base {
    id: number;
}
export {};
