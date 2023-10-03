import { PartialType } from '@nestjs/mapped-types';
import { cadastroProdutos} from './cadastro-produto.dto';

export class CadastroProdutosDto extends PartialType(cadastroProdutos) {}
