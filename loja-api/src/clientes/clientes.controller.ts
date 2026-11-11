import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CriarClienteDto } from './dto/criar-cliente.dto';
import { AtualizarClienteDto } from './dto/atualizar-cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private clientesService: ClientesService) {}

    @Get()
    listar() {
        return this.clientesService.listarClientes();
    }

    @Get(':id')
    async resId(@Param('id', ParseUUIDPipe)id: string) {
        const cliente = await this.clientesService.buscarClientePorId(id);
        if (!cliente) {
            throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
        }
        return cliente;
    }

    @Get('/email/:email')
    async resEmail(@Param('email') email: string) {
        const cliente = await this.clientesService.buscarClientePorEmail(email);
        if (!cliente) {
            throw new NotFoundException(`Cliente com email ${email} não encontrado.`);
        }
        return cliente;
    }

    @Post()
    criar (@Body() dados: CriarClienteDto) {
        return this.clientesService.criar(dados);
    }

    @Put(':id')
    async atualizar(@Param('id', ParseUUIDPipe) id: string, @Body() dados: AtualizarClienteDto) {
        const cliente = await this.clientesService.buscarClientePorId(id);
        if (!cliente) {
            throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
        }
        return this.clientesService.atualizar(id, dados);
    }
}
