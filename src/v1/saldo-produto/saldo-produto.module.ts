import { Module } from '@nestjs/common';
import { SaldoProdutoService } from './services/saldo-produto.service';
import { SaldoProdutoController } from './controllers/saldo-produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaldoProduto } from './entities/saldo-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaldoProduto])],
  controllers: [SaldoProdutoController],
  providers: [SaldoProdutoService],
  exports: [TypeOrmModule, SaldoProdutoService]
})
export class SaldoProdutoModule { }
