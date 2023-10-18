import { UpdateUsuarioDto } from 'src/v1/usuario/dto/update-usuario.dto';

export class AccessTokenDto {
  accessToken: string;

  usuario: UpdateUsuarioDto;
}
