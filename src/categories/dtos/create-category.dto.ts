import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: "category name"
    })
    @IsNotEmpty({message: "category name should not be empty"})
    @IsString({message: "category name should be string"})
    category_name:string;

    @ApiProperty({
        description: "category type"
    })
    @IsOptional()
    @IsNotEmpty({message: "category type should not be empty"})
    @IsString({message: "category type should be string only"})
    category_type?:string;

    @ApiProperty()
    @ApiProperty({
        description: "budget amount avatar"
    })
    @IsNumber({ allowNaN: false, allowInfinity: false}, { message: "budget amount avatar should be number only" })
    @IsNotEmpty({ message: "budget amount avatar should not be empty" })
    budget_amount: number;

    @ApiProperty()
    @ApiProperty({
        description: "category avatar"
    })
    @IsString({ message: "category avatar should be string" })
    @IsNotEmpty({ message: "category avatar should not be empty" })
    avatar: string;
}