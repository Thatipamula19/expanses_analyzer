import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteBudgetDto {
    @ApiProperty({ description: "budget amount id" })
    @IsString({ message: "budget amount id should be string oly" })
    @IsNotEmpty({ message: "budget amount id should not empty" })
    budget_amount_id: string;

}