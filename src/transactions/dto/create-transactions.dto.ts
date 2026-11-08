import { IsEmail, IsNumber, IsPositive } from "class-validator";

export class CreateTransactionsDto{
    @IsEmail()
    receiverEmail: string;

    @IsNumber()
    @IsPositive()
    amount: number;
}