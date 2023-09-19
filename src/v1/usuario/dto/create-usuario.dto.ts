import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({ maxLength: 10 })
    nome: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    senha: string;
}
