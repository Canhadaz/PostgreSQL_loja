import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) {}

    @Get()
    listar() {
        return this.produtosService.listarProdutos();
    }

    @Get(':id')
    async resId(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.produtosService.buscarProdutoPorId(id);
        if (!result) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`)
        }
        return result;
    }

    @Post()
    criar (@Body() dados: CriarProdutoDto) {
        return this.produtosService.criar(dados);
    }
}
