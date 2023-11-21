import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator';
export class RelatorioMovimentacaoDto  {
    @Type(() => Number)
    page: number;

    @Type(() => Number)
    rpp: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dataInicio: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dataFim: Date;

    @IsOptional()
    @IsArray()
    produtoIds: number[];

    @IsOptional()
    @IsArray()
    tipoProdutoIds: number[];
}
