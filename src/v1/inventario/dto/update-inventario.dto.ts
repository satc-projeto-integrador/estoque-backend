import { PartialType } from '@nestjs/swagger';
import { CreateInventarioDto } from './create-inventario.dto';
import { IsNotEmpty, IsString, IsEnum, IsDate, IsOptional } from 'class-validator';
import { SituacaoInventarioEnum } from 'src/types/enums';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {
    @IsOptional()
    @IsDate()
    dataFim: Date;
  
    @IsOptional()
    @IsEnum(SituacaoInventarioEnum)
    situacao: SituacaoInventarioEnum;
}
