import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UpdateTipoProdutoDto } from 'src/v1/tipo-produto/dto/update-tipo-produto.dto';

export class CreateProdutoDto {
  @ApiProperty({ maxLength: 100 })
  @IsNotEmpty()
  descricao: string;

  @ApiProperty()
  valor: string;

  @ApiProperty({ type: UpdateTipoProdutoDto })
  tipoProduto: UpdateTipoProdutoDto;
}
