import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator';

export class RelatorioSaldoEstoqueDto  {
    @Type(() => Number)
    page: number;

    @Type(() => Number)
    rpp: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dataFinal: Date;

    @IsOptional()
    @IsArray()
    produtoIds: number[];
}
