import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto/signin-dto';
import { UsuarioService } from 'src/v1/usuario/services/usuario.service';
import { EncryptionService } from 'src/common/services/encryption/encryption.service';
import { AccessTokenDto } from '../dto/access-token.dto';
import { AccessTokenPayload } from 'src/types/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
    private encryptionService: EncryptionService,
  ) {}

  async signIn(singInDto: SignInDto): Promise<AccessTokenDto> {
    const usuario = await this.usuarioService.findByEmail(singInDto.email);

    if (!usuario) this.credenciaisIncorretasErro();

    const senhaCorreta = this.encryptionService.comparePassword(
      singInDto.senha,
      usuario.senha,
    );

    if (!senhaCorreta) this.credenciaisIncorretasErro();

    const token = await this.generateToken({ usuarioId: usuario.id });

    return { accessToken: token, usuario };
  }

  credenciaisIncorretasErro() {
    throw new UnauthorizedException('Email ou senha inválidos');
  }

  private generateToken(payload: AccessTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
