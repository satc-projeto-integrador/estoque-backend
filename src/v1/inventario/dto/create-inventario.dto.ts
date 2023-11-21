import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsArray, IsOptional } from "class-validator";
import { SituacaoInventarioEnum } from "src/types/enums";
import { UpdateProdutoDto } from "src/v1/produtos/dto/update-produto.dto";

export class CreateInventarioDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsOptional()
    @IsArray()
    @ApiProperty({ type: UpdateProdutoDto })
    produtos: UpdateProdutoDto[];

    dataInicio = new Date();
    situacao = SituacaoInventarioEnum.CONTAGEM;
}
