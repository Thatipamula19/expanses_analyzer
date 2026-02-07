import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBudgetDto } from './dtos/create-budget.dto';
import { UpdateBudgetDto } from './dtos/update-budget.dto';
import { DeleteBudgetDto } from './dtos/delete-budget.dto';

@Injectable()
export class CategoryBudgetService {
    constructor(private readonly prismaService: PrismaService) { }

    async getBudgets(user_id: string, month: string) {
        const startOfDay = new Date(`${month}T00:00:00.000Z`);
        const endOfDay = new Date(`${month}T23:59:59.999Z`);
        try {

            const budgets = await this.prismaService.categoryBudget.findMany({
                where: {
                    user_id: user_id,
                    month: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                }
            })

            return {
                message: "budgets found",
                budgets: budgets
            }

        } catch (error) {

        }
    }

    async getBudget(budget_id: string, user_id: string) {

        try {
            const budget = await this.prismaService.categoryBudget.findFirst({
                where: {
                    user_id: user_id,
                    id: budget_id
                }
            });


            return {
                message: 'budget is found',
                data: budget
            }

        } catch (error) {
            throw new BadRequestException("getting record is failed")
        }

    }

    async createBudget(createBudget: CreateBudgetDto, user_id: string) {
        try {

            const budget_created = await this.prismaService.categoryBudget.create({
                data: {
                    ...createBudget,
                    user_id: user_id
                }
            })

            return {
                message: "budget created",
                data: budget_created
            }

        } catch (error) {
            throw new BadRequestException("budget creating is failed")
        }
    }

    async updateBudget(updateBudget: UpdateBudgetDto, user_id: string) {
        try {

            const budget = await this.prismaService.categoryBudget.findFirst({
                where: {
                    user_id: user_id,
                    id: updateBudget?.budget_amount_id
                }
            });

            if (!budget) {
                throw new NotFoundException("budget is not found with given id:" + updateBudget?.budget_amount_id);
            }

            const updated_budget = await this.prismaService.categoryBudget.update({
                where: {
                    user_id: user_id,
                    id: updateBudget?.budget_amount_id
                },
                data: {
                    category_id: updateBudget?.category_id ? updateBudget?.category_id : budget?.category_id,
                    budget_amount: updateBudget?.budget_amount ? updateBudget?.budget_amount : budget?.budget_amount,
                    month: updateBudget?.month ? updateBudget?.month : budget?.month
                }
            })

            return {
                message: "budget is updated",
                data: updated_budget
            }
        } catch (error) {
            throw new BadRequestException("updating the budget is failed...")
        }
    }

    async deleteBudget(deleteBudget: DeleteBudgetDto, user_id: string) {
        try {
            const budget = await this.prismaService.categoryBudget.findFirst({
                where: {
                    user_id: user_id,
                    id: deleteBudget?.budget_amount_id
                }
            });

            if (!budget) {
                throw new NotFoundException("budget is not found with given id:" + deleteBudget?.budget_amount_id);
            }

            const deleted_budget = await this.prismaService.categoryBudget.delete({
                where: {
                    id: deleteBudget?.budget_amount_id,
                    user_id: user_id
                }
            })

            return {
                message: "budget is deleted",
            }

        } catch (error) {
            throw new BadRequestException("budget deleted is failed...")
        }
    }
}
