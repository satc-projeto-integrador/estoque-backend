import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UpdateTipoProdutoDto } from 'src/v1/tipo-produto/dto/update-tipo-produto.dto';

export class CreateProdutoDto {
  @ApiProperty({ maxLength: 100 })
  @IsNotEmpty()
  descricao: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantidadeMinima: number;

  @ApiProperty({ type: UpdateTipoProdutoDto })
  tipoProduto: UpdateTipoProdutoDto;
}
