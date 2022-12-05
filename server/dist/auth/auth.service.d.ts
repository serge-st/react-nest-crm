import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        access_token: string;
    }>;
}
