import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class SuccessCreateUserDto extends PickType(CreateUserDto, ['username'] as const){
    id: number;
}