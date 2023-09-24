import { ApiProperty } from "@nestjs/swagger";

export class cadastroProdutos {
    @ApiProperty({ maxLength: 10 })
    descricao: string;
    
    @ApiProperty()
    valor: string;

    @ApiProperty()
    tipo: string;
}
