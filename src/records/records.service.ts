import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UpdateRecordDto } from './dtos/update-record.dto';
import { DeleteRecordDto } from './dtos/delete-record.dto';

@Injectable()
export class RecordsService {
    constructor(private readonly prismaService: PrismaService) { }

    async getRecords(user_id: string) {
        try {

            const records = await this.prismaService.records.findMany({ where: { user_id: user_id }, 
            include: {
                Categories: {
                    include: {
                        category: true
                    }
                }
            }
            });

            if (records?.length < 0) {
                throw new NotFoundException(`records not found with the given user id: ${user_id}`);
            }

            return {
                message: "record found",
                data: records
            }

        } catch (error) {
            throw new BadRequestException("record fetching is failed");
        }
    }

    async getRecord(record_id: string, user_id: string) {
        try {

            const record = await this.prismaService.records.findFirst({ where: { id: record_id, user_id: user_id } });

            if (!record) {
                throw new NotFoundException(`record found with the given record id: ${record_id}`)
            }

            return {
                message: "record found",
                data: record
            }

        } catch (error) {
            throw new BadRequestException("record fetching is failed...");
        }
    }

    async createRecord(createRecordDto: CreateRecordDto, user_id: string) {
        try {

            const account = await this.prismaService.accounts.findFirst({ where: { id: createRecordDto?.account_id, user_id: user_id } });

            if (!account) {
                throw new NotFoundException("account is not found for this user");
            }

            if (createRecordDto?.category_id) {
                const category = await this.prismaService.categories.findFirst({ where: { id: createRecordDto?.category_id, user_id: user_id } });

                if (!category) {
                    throw new NotFoundException("category is not found for this user");
                }
            }

            const recordCreated = await this.prismaService.records.create({
                data: { ...createRecordDto, user_id: user_id }
            })

            return {
                message: "record added successfully",
                data: recordCreated
            }

        } catch (error) {
            throw new BadRequestException("record insert is failed...")
        }
    }

    async updateRecord(updateRecordDto: UpdateRecordDto, user_id: string) {
        try {

            const account = await this.prismaService.accounts.findFirst({ where: { id: updateRecordDto?.account_id, user_id: user_id } });

            if (!account) {
                throw new NotFoundException("account is not found for this user");
            }

            if (updateRecordDto?.category_id) {
                const category = await this.prismaService.categories.findFirst({ where: { id: updateRecordDto?.category_id, user_id: user_id } });

                if (!category) {
                    throw new NotFoundException("category is not found for this user");
                }
            }

            const previous_record = await this.prismaService.records.findFirst({ where: { id: updateRecordDto?.record_id, user_id: user_id } });

            if (!previous_record) {
                throw new NotFoundException("record is not found with the given record id");
            }

            const updated_record = await this.prismaService.records.update({
                where: { id: updateRecordDto?.record_id, user_id: user_id },
                data: {
                    account_id: updateRecordDto?.account_id,
                    category_id: updateRecordDto?.category_id ? updateRecordDto?.category_id : previous_record?.category_id,
                    record_name: updateRecordDto?.record_name ? updateRecordDto?.record_name : previous_record?.record_name,
                    record_type: updateRecordDto?.record_type ? updateRecordDto?.record_type : previous_record?.record_type,
                    record_description: updateRecordDto?.record_description ? updateRecordDto?.record_description : previous_record?.record_description,
                    amount: updateRecordDto?.amount ? updateRecordDto?.amount : previous_record?.amount
                }
            })

            return {
                message: "record is updated",
                data: updated_record
            }


        } catch (error) {
            throw new BadRequestException("record updating is failed...")
        }
    }

    async deleteRecord(deleteRecordDto: DeleteRecordDto, user_id: string) {
        try {
            const previous_record = await this.prismaService.records.findFirst({ where: { id: deleteRecordDto?.record_id, user_id: user_id } });

            if (!previous_record) {
                throw new NotFoundException("record is not found with the given record id");
            }

            const deletedRecord = await this.prismaService.records.delete({ where: { id: deleteRecordDto?.record_id, user_id: user_id } });

            return {
                message: "record is deleted"
            }

        } catch (error) {
            throw new BadRequestException("record deletion is failed...", error);
        }
    }
}
