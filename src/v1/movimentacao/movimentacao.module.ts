import { Module } from '@nestjs/common';
import { MovimentacaoService } from './services/movimentacao.service';
import { MovimentacaoController } from './controllers/movimentacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao])],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
  exports: [TypeOrmModule]
})
export class MovimentacaoModule {}
