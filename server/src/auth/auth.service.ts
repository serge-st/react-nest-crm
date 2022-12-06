import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface.';
import { SignInResponse } from './interfaces/sign-in-response.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
        const {username, password} = authCredentialsDto;
        
        // https://github.com/serge-st/regex-username-validation/tree/main
        const usernameValidation = /^(?=.*$)(?![_])[a-zA-Z0-9_]+(?<![_])$/

        if (!usernameValidation.test(username)) {
            throw new UnauthorizedException('Please check you login credentials');
        }

        const user = await this.usersService.findByUsername(username);
        
        if (user && user.isEnabled && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username: user.username, role: user.role};
            return {
                access_token: this.jwtService.sign(payload)
            }
        } else {
            throw new UnauthorizedException('Please check you login credentials');
        }
    }
}
