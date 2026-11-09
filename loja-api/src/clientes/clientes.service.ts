import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

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
}
