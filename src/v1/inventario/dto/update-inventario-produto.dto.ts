import { PartialType } from '@nestjs/swagger';
import { CreateInventarioDto } from './create-inventario.dto';
import { IsNotEmpty, IsString, IsEnum, IsDate, IsNumber, Min } from 'class-validator';
import { SituacaoInventarioEnum } from 'src/types/enums';

export class UpdateInventarioProdutoDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantidadeEncontrada: number;
}
