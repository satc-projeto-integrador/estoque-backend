import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({ maxLength: 10 })
    desscricao: string;
    
    @ApiProperty()
    valor: string;

    @ApiProperty()
    tipo: string;
}
