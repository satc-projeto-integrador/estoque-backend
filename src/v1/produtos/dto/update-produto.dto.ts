import { PartialType } from '@nestjs/mapped-types';
import { CadastroprodutosDto } from './cadastro-produto.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
