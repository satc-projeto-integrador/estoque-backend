import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Insira um e-mail válido' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;
}
