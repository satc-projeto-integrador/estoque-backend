import { Module } from '@nestjs/common';

import { UsuarioModule } from './v1/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
