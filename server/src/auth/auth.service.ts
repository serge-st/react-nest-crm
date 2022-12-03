import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authCredentialsDto;
        const user = await this.usersService.findByUsername(username);
        
        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success';
        } else {
            throw new UnauthorizedException('Please check you login credentials');
        }
    }
}
