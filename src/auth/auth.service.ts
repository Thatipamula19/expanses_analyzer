import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingProvider } from 'src/users/provider/hashing.provider';
import { LoginDto } from './dtos/login.dto';
import { JweService } from './jwe.service';
import { UsersService } from 'src/users/users.service';
import { UserCreateDto } from 'src/users/dtos/user-create.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import * as bcrypt from 'bcrypt';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { EmailService } from 'src/email/email.service';
import { PASSWORD_RESET } from 'src/constants/contants';
import { User } from 'generated/prisma/client';
import { AccessTokenPayload, RefreshTokenPayload } from './interfaces/token-payload';
import { JWTPayload } from 'jose';
@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService,
        private readonly hashingProvider: HashingProvider,
        private readonly jweService: JweService,
        private readonly userService: UsersService,
        private readonly emailService: EmailService,
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashProvider: HashingProvider
    ) { }

    public async login(loginDto: LoginDto) {
        const user = await this.prismaService.user.findUnique({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isEqual = await this.hashingProvider.comparePassword(
            loginDto.password,
            user.password,
        );

        if (!isEqual) {
            throw new UnauthorizedException('Incorrect password');
        }

        const user_details = {
            user_id: user.id,
            name: user.name,
            avatar_img: user.avatar_img
        }
        const tokens = await this.generateTokens(user)
        const response = { ...tokens, user_details }

        return response;
    }


    public async createUser(createUserDto: UserCreateDto) {
        return await this.userService.createUser(createUserDto);
    }

    public async refreshToken(refreshTokenDto: RefreshTokenDto) {
        const { refreshToken } = refreshTokenDto;

        const payload = await this.jweService.decrypt(refreshToken);

        if (payload.type !== 'REFRESH') {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const storedToken = await this.prismaService.refreshToken.findFirst({
            where: {
                token: refreshToken,
                user_id: payload.sub,
                expires_at: { gt: new Date() },
            },
        });

        if (!storedToken) {
            throw new UnauthorizedException('Refresh token expired or revoked');
        }

        const user = await this.prismaService.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        await this.prismaService.refreshToken.delete({
            where: { id: storedToken.id },
        });

        return await this.generateTokens(user);
    }



    async forgotPassword(forgetPassword: ForgetPasswordDto) {
        const user = await this.prismaService.user.findUnique({
            where: { email: forgetPassword.email },
        });
        if (!user) {
            throw new NotFoundException(`user not found with the given email:${forgetPassword.email}`);
        }

        const payload = {
            sub: user.id,
            purpose: PASSWORD_RESET,
        };

        const token = await this.jweService.encrypt(payload, '15m');

        const tokenHash = await bcrypt.hash(token, 10);

        await this.prismaService.passwordResetToken.create({
            data: {
                user_id: user.id,
                tokenHash,
                expires_at: new Date(Date.now() + 15 * 60 * 1000),
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await this.emailService.sendPasswordResetMail(
            user.email,
            resetLink,
        );

        return { message: 'If the email exists, reset link sent' };
    }


    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const { token, password } = resetPasswordDto;

        const payload = await this.jweService.decrypt(token);
        if (payload.purpose !== PASSWORD_RESET) {
            throw new BadRequestException('Invalid token');
        }

        const tokens = await this.prismaService.passwordResetToken.findMany({
            where: {
                user_id: payload.sub,
                used: false,
                expires_at: { gt: new Date() },
            },
        });

        let matchedToken: any = null;

        for (const t of tokens) {
            const isMatch = await bcrypt.compare(token, t.tokenHash);
            if (isMatch) {
                matchedToken = t;
                break;
            }
        }

        if (!matchedToken) {
            throw new BadRequestException('Token expired or invalid');
        }


        await this.prismaService.user.update({
            where: { id: payload.sub },
            data: { password: await this.hashProvider.hashPassword(password) },
        });

        await this.prismaService.passwordResetToken.update({
            where: { id: matchedToken.id },
            data: { used: true },
        });

        return { message: 'Password reset successful' };
    }

    private async signToken<T extends JWTPayload>(
        payload: T,
        expiresIn: string,
    ): Promise<string> {
        return this.jweService.encrypt(payload, expiresIn);
    }

    private async generateTokens(user: any) {
        const accessTokenPayload: AccessTokenPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            type: 'ACCESS',
        };

        const accessToken = await this.signToken(
            accessTokenPayload,
            '1d',
        );

        const refreshTokenPayload: RefreshTokenPayload = {
            sub: user.id,
            role: user.role,
            type: 'REFRESH',
        };

        const refreshToken = await this.signToken(
            refreshTokenPayload,
            '7d',
        );

        await this.prismaService.refreshToken.create({
            data: {
                token: refreshToken,
                user_id: user.id,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        return { access_token: accessToken, refresh_token: refreshToken };
    }





    // @Cron('0 3 * * 0')
    // async cleanupExpiredTokens() {
    //     await this.prisma.passwordResetToken.deleteMany({
    //         where: {
    //             OR: [
    //                 { expiresAt: { lt: new Date() } },
    //                 { used: true },
    //             ],
    //         },
    //     });
    // }
}

