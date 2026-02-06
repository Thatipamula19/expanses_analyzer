import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class DeleteRecordDto {
    @ApiProperty({ description: "record id" })
    @IsNotEmpty({ message: "record id should not empty" })
    @IsString({ message: "record id should be string only" })
    @IsOptional()
    record_id: string;
}