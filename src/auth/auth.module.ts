import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JweService } from './jwe.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashingProvider } from 'src/users/provider/hashing.provider';
import { BcryptProvider } from 'src/users/provider/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [AuthService, JweService, {
    provide: HashingProvider,
    useClass: BcryptProvider
  }, BcryptProvider],
  controllers: [AuthController],
  imports: [PrismaModule, UsersModule, EmailModule],
  exports: [AuthService, HashingProvider, JweService]
})
export class AuthModule {}
