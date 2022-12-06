import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInResponse } from './interfaces/sign-in-response.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
        return this.authService.signIn(authCredentialsDto);
    }
}
