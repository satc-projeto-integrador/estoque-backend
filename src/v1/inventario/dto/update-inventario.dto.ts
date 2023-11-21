import { PartialType } from '@nestjs/swagger';
import { CreateInventarioDto } from './create-inventario.dto';
import { IsNotEmpty, IsString, IsEnum, IsDate } from 'class-validator';
import { SituacaoInventarioEnum } from 'src/types/enums';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {
    @IsNotEmpty()
    @IsDate()
    dataFim: Date;
  
    @IsNotEmpty()
    @IsEnum(SituacaoInventarioEnum)
    situacao: SituacaoInventarioEnum;
}
