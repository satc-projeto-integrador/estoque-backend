import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './v1/usuario/entities/usuario.entity';

import { UsuarioModule } from './v1/usuario/usuario.module';
import { AuthModule } from './v1/auth/auth.module';
import { Produto } from './v1/produtos/entities/produto.entity';
import { ProdutoModule } from './v1/produtos/produtos.module';
import { MovimentacaoModule } from './v1/movimentacao/movimentacao.module';
import { TipoProdutoModule } from './v1/tipo-produto/tipo-produto.module';
import { TipoProduto } from './v1/tipo-produto/entities/tipo-produto.entity';
import { TipoMovimentacaoModule } from './v1/tipo-movimentacao/tipo-movimentacao.module';
import { TipoMovimentacao } from './v1/tipo-movimentacao/entities/tipo-movimentacao.entity';
import { Movimentacao } from './v1/movimentacao/entities/movimentacao.entity';
import { MovimentacaoProduto } from './v1/movimentacao/entities/movimentacao-produto.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [Usuario, Produto, TipoProduto, TipoMovimentacao, Movimentacao, MovimentacaoProduto],
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy()
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsuarioModule,
    ProdutoModule,
    MovimentacaoModule,
    TipoProdutoModule,
    TipoMovimentacaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
