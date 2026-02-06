import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteAccountDto {
    @ApiProperty({
        description: "account id"
    })
    @IsString({ message: "account id is in string" })
    @IsNotEmpty({ message: "account id should not be empty" })
    account_id: string;
}