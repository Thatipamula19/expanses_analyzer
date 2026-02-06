import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRecordDto {
    @ApiProperty({description: "account id"})
    @IsNotEmpty({message: "account id should not empty"})
    @IsString({message: "account id should be string only"})
    account_id: string;

    @ApiProperty({description: "category id"})
    @IsNotEmpty({message: "category id should not empty"})
    @IsString({message: "category id should be string only"})
    @IsOptional()
    category_id: string;

    @ApiProperty({description: "record name"})
    @IsNotEmpty({message: "record name should not empty"})
    @IsString({message: "record name should be string only"})
    record_name: string;

    @ApiProperty({description: "record type"})
    @IsNotEmpty({message: "record type should not empty"})
    @IsString({message: "record type should be string only"})
    record_type: string;

    @ApiProperty({description: "record description"})
    @IsNotEmpty({message: "record description should not empty"})
    @IsString({message: "record description should be string only"})
    @IsOptional()
    record_description: string;

    @ApiProperty({description: "record amount"})
    @IsNotEmpty({message: "record amount should not empty"})
    @IsNumber({allowInfinity: false, allowNaN: false}, {message: "record amount should be numbers only"})
    amount: number;
}