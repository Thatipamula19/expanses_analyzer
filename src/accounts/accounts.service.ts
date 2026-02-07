import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { DeleteAccountDto } from './dtos/delete-account.dto';

@Injectable()
export class AccountsService {
    constructor(private readonly prismaService: PrismaService) { }

    async getAccounts(user_id: string) {
        try {

            const user = await this.prismaService.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new NotFoundException(`User with the given userId:${user_id} not found`);
            }

            const accounts = await this.prismaService.accounts.findMany({ where: { user_id } })
            if (!accounts.length) {
                throw new NotFoundException(`accounts not found given user_id:${user_id}`);
            }

            return {
                message: "accounts found",
                data: accounts
            }

        } catch (error) {
            throw new BadRequestException("account details not found")
        }
    }

    async getAccount(account_id: string, user_id: string) {
        try {

            const user = await this.prismaService.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new NotFoundException(`User with the given userId:${user_id} not found`);
            }

            const account = await this.prismaService.accounts.findFirst({ where: { id: account_id, user_id: user_id } });

            if (!account) {
                throw new NotFoundException(`account with the given account_id:${account_id} not found`);
            }

            return {
                message: "account found",
                data: account
            }

        } catch (error) {
            throw new BadRequestException("account details not found")
        }
    }

    async createAccount(createAccountDto: CreateAccountDto, user_id: string) {
        try {

            const user = await this.prismaService.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new NotFoundException(`User with the given userId:${user_id} not found`);
            }

            const account = await this.prismaService.accounts.create({ data: { ...createAccountDto, user_id: user_id } })
            return {
                message: "account is created",
                data: account
            }

        } catch (error) {
            throw new BadRequestException("account creation failed")
        }
    }

    async updateAccount(updateAccountDto: UpdateAccountDto, user_id: string) {
        try {

            const user = await this.prismaService.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new NotFoundException(`User with the given userId:${user_id} not found`);
            }

            const account = await this.prismaService.accounts.findFirst({ where: { id: updateAccountDto?.account_id, user_id: user_id } });

            if (!account) {
                throw new NotFoundException(`User with the given userId:${user_id} not found`);
            }

            const updatedAccount = await this.prismaService.accounts.update({
                where: { id: updateAccountDto?.account_id, user_id: user_id }, data: {
                    account_name: updateAccountDto?.account_name ? updateAccountDto?.account_name : account?.account_name,
                    account_type: updateAccountDto?.account_type ? updateAccountDto?.account_type : account?.account_type,
                    avatar: updateAccountDto?.avatar ? updateAccountDto?.avatar : account?.avatar
                }
            })
            return {
                message: "account is updated",
                data: updatedAccount
            }

        } catch (error) {
            throw new BadRequestException("account updating failed")
        }
    }

    async deleteAccount(deleteAccountDto: DeleteAccountDto, user_id: string) {
        try {
            const account = await this.prismaService.accounts.findFirst({ where: { id: deleteAccountDto?.account_id, user_id: user_id } });

            if (!account) {
                throw new NotFoundException(`User with the given userId:${user_id} not found`);
            }

            const deletedAccount = await this.prismaService.accounts.delete({
                where: { id: deleteAccountDto?.account_id, user_id: user_id }
            })
            return {
                message: "account is deleted"
            }

        } catch (error) {
            throw new BadRequestException("account deletion failed")
        }
    }


}
