import { Module } from '@nestjs/common';
import { produtosService } from './services/produtos.service';
import { produtosController } from './controllers/produtos.controller';
import { produtos } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([produtos])],
  controllers: [produtosController],
  providers: [produtosService],
  exports: [TypeOrmModule]
})
export class produtosModule {}
