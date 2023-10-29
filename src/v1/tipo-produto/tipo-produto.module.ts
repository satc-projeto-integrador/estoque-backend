import { Module } from '@nestjs/common';
import { TipoProdutoController } from './controller/tipo-produto.controller';
import { TipoProdutoService } from './services/tipo-produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProduto } from './entities/tipo-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProduto])],
  controllers: [TipoProdutoController],
  providers: [TipoProdutoService],
  exports: [TypeOrmModule, TipoProdutoService],
})
export class TipoProdutoModule {}
