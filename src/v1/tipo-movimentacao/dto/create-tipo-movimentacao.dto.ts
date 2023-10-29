import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { TipoMovimentacaoEnum } from "src/types/enums";

export class CreateTipoMovimentacaoDto {
    @ApiProperty({ maxLength: 100 })
    @IsNotEmpty()
    descricao: string;

    @IsEnum(TipoMovimentacaoEnum)
    @ApiProperty({ enum: TipoMovimentacaoEnum, required: true })
    tipo: TipoMovimentacaoEnum;
}
