import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CriarClienteDto } from './dto/criar-cliente.dto';
import { AtualizarClienteDto } from './dto/atualizar-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private db: DatabaseService) {}

  async listarClientes() {
    const result = await this.db.query('SELECT * FROM clientes');
    return result.rows;
  }

  async buscarClientePorId(id: string) {
    const result = await this.db.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return result.rows[0];
  }

  async buscarClientePorEmail(email: string) {
    const result = await this.db.query('SELECT * FROM clientes WHERE email = $1', [email]);
    return result.rows[0];
  }
  
  async criar(dados: CriarClienteDto) {
    try {
      const result = await this.db.query('INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *', [dados.nome, dados.email]);
      return result.rows[0];
    } catch (error) {
      if ((error as { code: string }).code === '23505') {
        throw new ConflictException(`Já existe um cliente com o email ${dados.email}`);
      }
      throw error;
    }
  }

  async atualizar(id: string, dados: AtualizarClienteDto) {
    try {
      const result = await this.db.query('UPDATE clientes SET nome = $1, email = $2 WHERE id = $3 RETURNING *', [dados.nome, dados.email, id]);
      return result.rows[0];
    } catch (error) {
      if ((error as { code?: string }).code === '23505') {
        throw new ConflictException(`Já existe um cliente com o email ${dados.email}`);
      }
      throw error;
    }
  }
}
