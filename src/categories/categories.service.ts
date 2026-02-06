import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-categroy.dto';
import { DeleteCategoryDto } from './dtos/delete-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly prismaService: PrismaService) { }

    async getCategories(user_id: string) {
        try {
            const user = await this.prismaService.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new NotFoundException(`user with the given userId:${user_id} not found`);
            }

            const categories = await this.prismaService.categories.findMany({ where: { user_id: user_id } });

            if (categories.length > 0) {
                return {
                    message: "categories found",
                    data: categories
                }
            } else {
                throw new NotFoundException("categories are not found");
            }
        } catch (error) {
            throw new BadRequestException("categories are not found")
        }
    }

    async getCategory(category_id: string, user_id: string) {
        try {
            const user = await this.prismaService.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new NotFoundException(`user with the given userId:${user_id} not found`);
            }

            const category = await this.prismaService.categories.findFirst({ where: { id: category_id, user_id: user_id } });

            return {
                message: "category is found",
                data: category
            }
        } catch (error) {
            throw new BadRequestException("category is not found")
        }
    }


    async createCategory(createCategory: CreateCategoryDto, user_id: string) {
        try {

            const user = await this.prismaService.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new NotFoundException(`user with the given userId:${user_id} not found`);
            }

            const category = await this.prismaService.categories.create({ data: { ...createCategory, user_id: user_id } });

            return {
                message: "category is created",
                data: category
            }

        } catch (error) {
            throw new BadRequestException("category creation failed")
        }
    }

    async updateCategory(updateCategory: UpdateCategoryDto, user_id: string) {
        try {
            const user = await this.prismaService.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new NotFoundException(`user with the given userId:${user_id} not found`);
            }

            const category = await this.prismaService.categories.findFirst({ where: { id: updateCategory?.category_id, user_id: user_id } });

            const updatedCategory = await this.prismaService.categories.update({
                where: { id: updateCategory?.category_id, user_id: user_id },
                data: {
                    category_name: updateCategory?.category_name ? updateCategory?.category_name : category?.category_name,
                    category_type: updateCategory?.category_type ? updateCategory?.category_type : category?.category_type
                }
            });

            return {
                message: "category is updated",
                data: updatedCategory
            }

        } catch (error) {
            throw new BadRequestException("category updating failed")
        }
    }

    async deleteCategory(deleteCategory: DeleteCategoryDto, user_id: string) {
        try {

            const category = await this.prismaService.categories.findFirst({ where: { id: deleteCategory?.category_id, user_id: user_id } });

            if (!category) {
                throw new NotFoundException(`category is not found with the given id ${deleteCategory?.category_id}`);
            }

            const deletedCategory = await this.prismaService.categories.delete({ where: { id: deleteCategory?.category_id, user_id: user_id } });

            return {
                message: "category is deleted"
            }

        } catch (error) {
            throw new BadRequestException("category deletion failed")
        }
    }
}
