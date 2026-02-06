import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get("user-info")
    @ApiOkResponse()
    async getUser(@ActiveUser("sub") user_id: string){
        return await this.usersService.getUser(user_id);
    }


}
