import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptionModule } from 'src/common/services/encryption/encryption.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), EncryptionModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [TypeOrmModule, UsuarioService],
})
export class UsuarioModule {}
