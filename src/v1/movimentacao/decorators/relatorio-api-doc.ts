import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function RelatorioMovimentacaoDoc(): MethodDecorator {
    return applyDecorators(
        ApiQuery({
            name: 'produtoIds',
            required: false,
            description: 'Ids dos produtos',
            type: Array<Number>, // Tipo do parâmetro (opcional)
          }),
        ApiQuery({
            name: 'tipoProdutoIds',
            required: false,
            description: 'Id do tipo do produto',
            type: Array<Number>, // Tipo do parâmetro (opcional)
        }),
        ApiQuery({
            name: 'dataInicio',
            required: false,
            description: 'Data inicio busca da movimentação',
            type: Date, // Tipo do parâmetro (opcional)
        }),
        ApiQuery({
            name: 'dataFim',
            required: false,
            description: 'Data fim busca da movimentação',
            type: Date, // Tipo do parâmetro (opcional)
        })
    );
}
