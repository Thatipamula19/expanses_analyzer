import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateBudgetDto {

    @ApiProperty({ description: "budget amount id" })
    @IsString({ message: "budget amount id should be string oly" })
    @IsNotEmpty({ message: "budget amount id should not empty" })
    budget_amount_id: string;

    @ApiProperty({ description: "category id" })
    @IsString({ message: "category id should be string oly" })
    @IsNotEmpty({ message: "category id should not empty" })
    category_id: string;

    @ApiProperty({ description: "month of the budget" })
    @IsString({ message: "month should be string only" })
    @IsNotEmpty({ message: "month should not empty" })
    month: string;

    @ApiProperty({ description: "budget amount" })
    @IsNotEmpty({ message: "budget amount should not empty" })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "budget amount should be number only" })
    budget_amount: number
}