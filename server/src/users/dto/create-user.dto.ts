import { UserRoleId, UserRoles } from "../entities/userRole.entity";
import { IsNotEmpty, IsIn, IsBoolean, IsString, IsEmail, IsOptional, Matches, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(2, 20)
    @Matches(/^(?=.*$)(?![_])[a-zA-Z0-9_]+(?<![_])$/, {
        message: `Username can only contain numbers, letters and underscores in the middle`
    })
    username: string;

    @IsString()
    @Length(8, 20)
    // Password RegEx: https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: `The password is too weak. The password should contain at least 1 upper case letter, 1 lower case letter, 1 number or special character`
    })
    password: string;

    @IsNotEmpty()
    @IsIn(Object.keys(UserRoles))
    role: UserRoleId;

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
