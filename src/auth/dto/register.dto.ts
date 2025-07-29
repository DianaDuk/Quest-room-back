import { IsEmail, IsString, MinLength } from "class-validator";


export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    phone: string;
}