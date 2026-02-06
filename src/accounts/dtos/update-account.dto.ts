import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateAccountDto {

    @ApiProperty({
        description: "account id"
    })
    @IsString({ message: "account id is in string" })
    @IsNotEmpty({ message: "account id should not be empty" })
    account_id: string;

    @ApiProperty({
        description: "account name"
    })
    @IsOptional()
    @IsString({ message: "account name is in string" })
    @IsNotEmpty({ message: "account name should not be empty" })
    account_name?: string;

    @ApiProperty({
        description: "account type"
    })
    @IsOptional()
    @IsString({ message: "account name is in string" })
    @IsNotEmpty({ message: "account name should not be empty" })
    account_type?: string;
}