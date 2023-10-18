import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './v1/usuario/entities/usuario.entity';

import { UsuarioModule } from './v1/usuario/usuario.module';
import { ExemploModule } from './v1/exemplo/exemplo.module';
import { Exemplo } from './v1/exemplo/entities/exemplo.entity';
import { AuthModule } from './v1/auth/auth.module';
import { Produto } from './v1/produtos/entities/produto.entity';
import { ProdutoModule } from './v1/produtos/produtos.module';
import { MovimentacaoModule } from './v1/movimentacao/movimentacao.module';

@Module({
  imports: [
    AuthModule,
    ExemploModule,
    UsuarioModule,
    ProdutoModule,
    MovimentacaoModule,
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
          entities: [Usuario, Produto, Exemplo],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
