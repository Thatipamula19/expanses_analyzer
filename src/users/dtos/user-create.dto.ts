import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
} from "class-validator";

export class UserCreateDto {

  @ApiProperty()
  @IsString({ message: "name should be string value" })
  @IsNotEmpty({ message: "name value should not be empty" })
  @MinLength(3, { message: "name should have min 3 characters" })
  @MaxLength(20, { message: "name should have max 20 characters" })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty()
  @MaxLength(100, { message: "Email should have max 100 characters" })
  email: string;

  @ApiProperty({
    description: 'Password must contain letters and numbers',
  })
  @IsString({ message: "password should be string value" })
  @IsNotEmpty({ message: "password value should not be empty" })
  @MinLength(6, { message: "password should have min 6 characters" })
  @MaxLength(15, { message: "password should have max 15 characters" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,15}$/,
    {
      message:
        "Password must include uppercase, lowercase, number and special character",
    },
  )
  password: string;


  @ApiProperty({ description: "gender must be either male or female" })
  @IsString({ message: "gender should be string value" })
  @IsNotEmpty({ message: "gender value should not be empty" })
  @Matches(/^(male|female)$/, {
    message: "gender must be either male or female",
  })
  gender: string;

  @IsOptional()
  avatar_img:string;
}


