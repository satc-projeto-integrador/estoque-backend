import { Module } from '@nestjs/common';
import { ExemploService } from './services/exemplo.service';
import { ExemploController } from './controllers/exemplo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exemplo } from './entities/exemplo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exemplo])],
  controllers: [ExemploController],
  providers: [ExemploService],
  exports: [TypeOrmModule]
})
export class ExemploModule {}
