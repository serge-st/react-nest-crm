import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class AuthCredentialsDto extends PickType(CreateUserDto, ['username', 'password'] as const) {}