import { CreateUserDto } from "src/users/dto/create-user.dto";
declare const AuthCredentialsDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUserDto, "username" | "password">>;
export declare class AuthCredentialsDto extends AuthCredentialsDto_base {
}
export {};
