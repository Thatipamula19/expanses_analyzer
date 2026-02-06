import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-categroy.dto';
import { DeleteCategoryDto } from './dtos/delete-category.dto';

@ApiBearerAuth('access-token')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }

    @Get()
    @ApiOkResponse({ description: "accounts found" })
    async getCategories(@ActiveUser("sub") user_id: string) {
        return await this.categoryService.getCategories(user_id);
    }

    @Get(":category_id")
    @ApiOkResponse({ description: "accounts found" })
    async getCategory(@Param("category_id") category_id: string, @ActiveUser("sub") user_id: string) {
        return await this.categoryService.getCategory(category_id, user_id);
    }

    @Post("create")
    @ApiCreatedResponse({ description: "category is created" })
    async createCategory(@Body() createCategory: CreateCategoryDto, @ActiveUser("sub") user_id: string) {
        return await this.categoryService.createCategory(createCategory, user_id);
    }

    @Patch("update")
    @ApiOkResponse({ description: "category is updated" })
    async updateCategory(@Body() updateCategory: UpdateCategoryDto, @ActiveUser("sub") user_id: string) {
        return await this.categoryService.updateCategory(updateCategory, user_id);
    }

    @Delete("delete")
    @ApiOkResponse({ description: "category is deleted" })
    async deleteCategory(@Body() deleteCategory: DeleteCategoryDto, @ActiveUser('sub') user_id: string) {
        return await this.categoryService.deleteCategory(deleteCategory, user_id);
    }
}
