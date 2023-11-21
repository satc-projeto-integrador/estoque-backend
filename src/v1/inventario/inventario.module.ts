import { Module } from '@nestjs/common';
import { InventarioService } from './services/inventario.service';
import { InventarioController } from './controllers/inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from '../movimentacao/entities/movimentacao.entity';
import { SaldoProdutoModule } from '../saldo-produto/saldo-produto.module';
import { Inventario } from './entities/inventario.entity';
import { InventarioProduto } from './entities/inventario-produto.entity';
import { InventarioProdutoController } from './controllers/inventario-produto.controller';
import { InventarioProdutoService } from './services/inventario-produto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario]),
    TypeOrmModule.forFeature([InventarioProduto]),
    SaldoProdutoModule
  ],
  controllers: [InventarioController, InventarioProdutoController],
  providers: [InventarioService, InventarioProdutoService],
})
export class InventarioModule {}
