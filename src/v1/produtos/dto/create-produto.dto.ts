import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({ maxLength: 10 })
  descricao: string;

  @ApiProperty()
  valor: string;

  @ApiProperty()
  tipo: string;
}
