import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AllowAnonymous } from './decorators/allow-anonymous.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { UserCreateDto } from 'src/users/dtos/user-create.dto';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) { }

    @AllowAnonymous()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    public async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @AllowAnonymous()
    @Post('signup')
    public async createUser(@Body() createUserDto: UserCreateDto) {
        return await this.authService.createUser(createUserDto);
    }

    @AllowAnonymous()
    @Post('forgot-password')
    public async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
        return await this.authService.forgotPassword(forgetPasswordDto)
    }

    @AllowAnonymous()
    @Post('reset-password')
    public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return await this.authService.resetPassword(resetPasswordDto);
    }

    @AllowAnonymous()
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return await this.authService.refreshToken(refreshTokenDto);
    }
    
}
