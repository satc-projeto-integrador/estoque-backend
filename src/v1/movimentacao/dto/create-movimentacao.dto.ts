import { ApiProperty } from "@nestjs/swagger";

export class CreateMovimentacaoDto {
    @ApiProperty()
    descricao: string;
}
