import { IsString, IsOptional, IsArray, Matches, IsNotEmpty } from "class-validator";
import { RouteType } from "src/app.service";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @Matches(/^(CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PUT|TRACE|\*)\s\/[a-zA-Z0-9-]*$/, {
        each: true,
        message: `each value in forbiddenRoutes must look like 'GET /route' OR '* /route'`,
    })
    forbiddenRoutes: RouteType[];
}