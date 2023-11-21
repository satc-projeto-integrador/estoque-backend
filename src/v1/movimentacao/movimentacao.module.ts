import { Module } from '@nestjs/common';
import { MovimentacaoService } from './services/movimentacao.service';
import { MovimentacaoController } from './controllers/movimentacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacao.entity';
import { SaldoProdutoModule } from '../saldo-produto/saldo-produto.module';
import { MovimentacaoProduto } from './entities/movimentacao-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao, MovimentacaoProduto]), SaldoProdutoModule],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
  exports: [TypeOrmModule]
})
export class MovimentacaoModule { }
