import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';

@Module({
  providers: [UsersService, {
    provide: HashingProvider,
    useClass: BcryptProvider
  }],
  controllers: [UsersController],
  imports: [PrismaModule],
  exports: [UsersService]
})
export class UsersModule {}
