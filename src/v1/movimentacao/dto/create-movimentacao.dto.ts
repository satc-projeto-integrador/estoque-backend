import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
import { UpdateTipoMovimentacaoDto } from "src/v1/tipo-movimentacao/dto/update-tipo-movimentacao.dto";
import { CreateMovimentacaoProdutoDto } from "./create-movimentacao-produto.dto";

export class CreateMovimentacaoDto {
    @ApiProperty({ required: false })
    observacao?: string;

    @ApiProperty({ type: UpdateTipoMovimentacaoDto })
    tipoMovimentacao: UpdateTipoMovimentacaoDto;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ type: CreateMovimentacaoProdutoDto })
    movimentacaoProdutos: CreateMovimentacaoProdutoDto[];
}
