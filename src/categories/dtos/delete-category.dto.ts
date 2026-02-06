import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteCategoryDto {
    @ApiProperty({
        description: "category id should string"
    })
    @IsNotEmpty({ message: "category id should not be empty" })
    @IsString({ message: "category id should be string only" })
    category_id: string;
}