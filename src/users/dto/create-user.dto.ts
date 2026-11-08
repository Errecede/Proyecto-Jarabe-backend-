import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto{
    @IsString()
    @MinLength(3)
    fullName: string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password:string;
}