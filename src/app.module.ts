import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './v1/usuario/entities/usuario.entity';

import { UsuarioModule } from './v1/usuario/usuario.module';
import { ExemploModule } from './v1/exemplo/exemplo.module';
import { Exemplo } from './v1/exemplo/entities/exemplo.entity';

@Module({
  imports: [
    UsuarioModule,
    ExemploModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      entities: [Usuario, Exemplo],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    ExemploModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
