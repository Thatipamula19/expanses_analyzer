import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: "enter user email"
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @ApiProperty({
        description: "enter user password"
    })
    @IsNotEmpty()
    @IsString()
    password:string
}