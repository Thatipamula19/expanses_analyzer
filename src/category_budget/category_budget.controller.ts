import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoryBudgetService } from './category_budget.service';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { CreateBudgetDto } from './dtos/create-budget.dto';
import { UpdateBudgetDto } from './dtos/update-budget.dto';
import { DeleteBudgetDto } from './dtos/delete-budget.dto';

@Controller('category-budget')
export class CategoryBudgetController {
    constructor(private readonly categoryBudgetService: CategoryBudgetService) { }

    @Get()
    @ApiOkResponse({ description: "user records" })
    @ApiQuery({ name: 'month', required: false, example: '2026-02-07' })
    async getBudgets(@ActiveUser("sub") user_id: string, @Query('month') month: string) {
        return await this.categoryBudgetService.getBudgets(user_id, month);
    }

    @Get("/:budget_id")
    @ApiOkResponse({ description: "user record found" })
    async getRecord(@Param("budget_id") record_id: string, @ActiveUser("sub") user_id: string) {
        return await this.categoryBudgetService.getBudget(record_id, user_id);
    }

    @Post("create")
    @ApiCreatedResponse({ description: "record is created" })
    async createRecord(@Body() createBudget: CreateBudgetDto, @ActiveUser("sub") user_id: string) {
        return await this.categoryBudgetService.createBudget(createBudget, user_id);
    }

    @Patch("update")
    @ApiOkResponse({ description: "record is updated" })
    async updateRecord(@Body() updateBudget: UpdateBudgetDto, @ActiveUser("sub") user_id: string) {
        return await this.categoryBudgetService.updateBudget(updateBudget, user_id);
    }

    @Delete("delete")
    @ApiOkResponse({ description: "record is updated" })
    async deleteRecord(@Body() deleteBudget: DeleteBudgetDto, @ActiveUser("sub") user_id: string) {
        return await this.categoryBudgetService.deleteBudget(deleteBudget, user_id);
    }
}
