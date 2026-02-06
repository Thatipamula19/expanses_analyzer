import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { DeleteAccountDto } from './dtos/delete-account.dto';
import { AccountsService } from './accounts.service';

@ApiBearerAuth('access-token')
@Controller('accounts')
export class AccountsController {

    constructor(private readonly accountService: AccountsService) { }

    @Get()
    @ApiOkResponse()
    async getUserAccounts(@ActiveUser('sub') user_id: string) {
        return await this.accountService.getAccounts(user_id);
    }

    @Get(":account_id")
    @ApiOkResponse()
    async getUserAccount(@Param("account_id") account_id: string, @ActiveUser('sub') user_id: string) {
        return await this.accountService.getAccount(account_id, user_id);
    }

    @Post("create")
    async createAccount(@Body() createAccountDto: CreateAccountDto, @ActiveUser('sub') user_id: string) {
        return await this.accountService.createAccount(createAccountDto, user_id);
    }

    @Patch("update")
    async updateAccount(@Body() updateAccountDto: UpdateAccountDto, @ActiveUser('sub') user_id: string) {
        return await this.accountService.updateAccount(updateAccountDto, user_id);
    }

    @Delete("delete")
    async deleteAccount(@Body() deleteAccountDto: DeleteAccountDto, @ActiveUser('sub') user_id: string) {
        return await this.accountService.deleteAccount(deleteAccountDto, user_id);
    }


}
