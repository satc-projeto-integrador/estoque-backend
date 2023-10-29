import { Module } from '@nestjs/common';
import { MovimentacaoService } from './services/movimentacao.service';
import { MovimentacaoController } from './controllers/movimentacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacao.entity';
import { SaldoProdutoModule } from '../saldo-produto/saldo-produto.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao]), SaldoProdutoModule],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
  exports: [TypeOrmModule]
})
export class MovimentacaoModule { }
