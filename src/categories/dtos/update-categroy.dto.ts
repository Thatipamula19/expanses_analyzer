import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty({
        description: "category id should string"
    })
    @IsNotEmpty({message: "category id should not be empty"})
    @IsString({message: "category id should be string only"})
    category_id:string;

    @ApiProperty({
        description: "category name"
    })
    @IsOptional()
    @IsNotEmpty({message: "category name should not be empty"})
    @IsString({message: "category name should be string"})
    category_name?:string;

    @ApiProperty({
        description: "category type"
    })
    @IsOptional()
    @IsNotEmpty({message: "category type should not be empty"})
    @IsString({message: "category type should be string only"})
    category_type?:string;
}