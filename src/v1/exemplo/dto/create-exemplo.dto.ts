import { ApiProperty } from "@nestjs/swagger";

export class CreateExemploDto {
    @ApiProperty()
    descricao: string;
}
