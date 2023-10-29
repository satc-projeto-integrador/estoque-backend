import { ApiProperty } from "@nestjs/swagger";
import { UpdateProdutoDto } from "src/v1/produtos/dto/update-produto.dto";

export class CreateMovimentacaoProdutoDto {
    @ApiProperty({ required: true })
    valor: number;

    @ApiProperty({ required: true })
    quantidade: number;

    @ApiProperty({ type: UpdateProdutoDto })
    produto: UpdateProdutoDto;
}
