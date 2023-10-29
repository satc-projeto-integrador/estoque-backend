import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTipoProdutoDto {
  @ApiProperty({ maxLength: 100 })
  @IsNotEmpty()
  descricao: string;
}
