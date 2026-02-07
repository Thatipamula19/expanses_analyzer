import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizeGuard } from './auth/guards/authorize.guard';
import { EmailModule } from './email/email.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { RecordsModule } from './records/records.module';
import { CategoryBudgetModule } from './category_budget/category_budget.module';


@Module({
  imports: [PrismaModule, UsersModule, AuthModule, EmailModule, AccountsModule, CategoriesModule, RecordsModule, CategoryBudgetModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,     {
      provide: APP_GUARD,
      useClass: AuthorizeGuard
    }],
})
export class AppModule {}
