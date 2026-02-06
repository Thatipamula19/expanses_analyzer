import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class ForgetPasswordDto {
    @ApiProperty({
        description: "enter user email"
    })
    @IsEmail({}, { message: "Invalid email format" })
    @IsNotEmpty()
    @MaxLength(100, { message: "Email should have max 100 characters" })
    email: string;
}