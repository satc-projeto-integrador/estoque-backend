import { Module } from '@nestjs/common';
import { TipoMovimentacaoService } from './services/tipo-movimentacao.service';
import { TipoMovimentacaoController } from './controllers/tipo-movimentacao.controller';
import { Produto } from '../produtos/entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMovimentacao } from './entities/tipo-movimentacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoMovimentacao])],
  controllers: [TipoMovimentacaoController],
  providers: [TipoMovimentacaoService],
  exports: [TypeOrmModule]
})
export class TipoMovimentacaoModule { }
