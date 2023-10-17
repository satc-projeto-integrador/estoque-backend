import { Module } from '@nestjs/common';
import { produtosController } from './controllers/produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './services/produto.service';
import { Produto } from './entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [produtosController],
  providers: [ProdutoService],
  exports: [TypeOrmModule],
})
export class produtosModule {}
