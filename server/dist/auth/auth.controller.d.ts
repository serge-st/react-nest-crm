import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInResponse } from './interfaces/sign-in-response.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse>;
}
