import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  // esse comando procura o arquivo .env e carrega as variaveis de ambiente no processo.
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ClientesModule, ProdutosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}