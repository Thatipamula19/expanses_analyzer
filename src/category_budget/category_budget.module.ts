import { Module } from '@nestjs/common';
import { CategoryBudgetController } from './category_budget.controller';
import { CategoryBudgetService } from './category_budget.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CategoryBudgetController],
  providers: [CategoryBudgetService],
  imports: [PrismaModule]
})
export class CategoryBudgetModule {}
