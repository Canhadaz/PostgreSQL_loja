import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';

@Injectable()
export class ProdutosService {
    constructor(private db: DatabaseService){}

    async listarProdutos() {
        const result = await this.db.query('SELECT * FROM produtos');
        return result.rows;
    }
    
    async buscarProdutoPorId(id: string) {
        const result = await this.db.query('SELECT * FROM produtos WHERE id = $1', [id]);
        return result.rows[0];
    }

    async criar(dados: CriarProdutoDto){
        try {
            const result = await this.db.query(
                'INSERT INTO produtos (nome, preco, estoque) VALUES ($1, $2, $3) RETURNING *'
                [dados.nome, dados.preco, dados.estoque]
            )
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}
