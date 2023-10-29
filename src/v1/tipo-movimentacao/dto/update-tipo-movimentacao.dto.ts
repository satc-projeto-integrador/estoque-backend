import { PartialType } from '@nestjs/swagger';
import { CreateTipoMovimentacaoDto } from './create-tipo-movimentacao.dto';

export class UpdateTipoMovimentacaoDto extends PartialType(CreateTipoMovimentacaoDto) {}
