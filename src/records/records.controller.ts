import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { RecordsService } from './records.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UpdateRecordDto } from './dtos/update-record.dto';
import { DeleteRecordDto } from './dtos/delete-record.dto';

@ApiBearerAuth("access-token")
@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) { }

    @Get()
    @ApiOkResponse({ description: "user records" })
    async getRecords(@ActiveUser("sub") user_id: string) {
        return await this.recordsService.getRecords(user_id);
    }

    @Get("stats")
    @ApiOkResponse({ description: "get stats" })
    @ApiQuery({ name: 'date', required: false, example: '2026-02-07' })
    async getStats(@ActiveUser("sub") user_id: string, @Query('date') date?: string) {
        return await this.recordsService.getStatsRecords(user_id, date)
    }

    @Get("/:record_id")
    @ApiOkResponse({ description: "user record found" })
    async getRecord(@Param("record_id") record_id: string, @ActiveUser("sub") user_id: string) {
        return await this.recordsService.getRecord(record_id, user_id);
    }

    @Post("create")
    @ApiCreatedResponse({ description: "record is created" })
    async createRecord(@Body() createRecordDto: CreateRecordDto, @ActiveUser("sub") user_id: string) {
        return await this.recordsService.createRecord(createRecordDto, user_id);
    }

    @Patch("update")
    @ApiOkResponse({ description: "record is updated" })
    async updateRecord(@Body() updateRecordDto: UpdateRecordDto, @ActiveUser("sub") user_id: string) {
        return await this.recordsService.updateRecord(updateRecordDto, user_id);
    }

    @Delete("delete")
    @ApiOkResponse({ description: "record is updated" })
    async deleteRecord(@Body() deleteRecordDto: DeleteRecordDto, @ActiveUser("sub") user_id: string) {
        return await this.recordsService.deleteRecord(deleteRecordDto, user_id);
    }
}
