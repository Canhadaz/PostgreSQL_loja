import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';

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
}
