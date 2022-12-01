import { UserRoleId, UserRoles } from "../entities/userRole.entity";
import { IsNotEmpty, MaxLength, IsIn, IsBoolean, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsIn(Object.keys(UserRoles))
    roleId: UserRoleId;

    @IsOptional()
    @IsBoolean()
    isEnabled?: boolean;

    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}
