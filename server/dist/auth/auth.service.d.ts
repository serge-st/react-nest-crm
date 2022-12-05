import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInResponse } from './interfaces/sign-in-response.interface';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse>;
}
