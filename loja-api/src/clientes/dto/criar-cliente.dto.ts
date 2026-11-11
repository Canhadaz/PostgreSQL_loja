import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CriarClienteDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}