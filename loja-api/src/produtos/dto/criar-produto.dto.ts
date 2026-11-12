import { IsString, IsNotEmpty } from "class-validator";

export class CriarProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    preco: number;

    @IsNotEmpty()
    estoque: number;
}