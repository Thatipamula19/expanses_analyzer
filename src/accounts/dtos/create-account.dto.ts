import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateAccountDto {

    @ApiProperty()
    @ApiProperty({
        description: "account name"
    })
    @IsString({message: "account name should be string"})
    @IsNotEmpty({message: "account name should not be empty"})
    account_name: string;

    @ApiProperty()
    @ApiProperty({
        description: "account type"
    })
    @IsString({message: "account type should be string"})
    @IsNotEmpty({message: "account type should not be empty"})
    account_type: string;

    @ApiProperty()
    @ApiProperty({
        description: "account avatar"
    })
    @IsString({ message: "account avatar should be string" })
    @IsNotEmpty({ message: "account avatar should not be empty" })
    avatar: string;
}