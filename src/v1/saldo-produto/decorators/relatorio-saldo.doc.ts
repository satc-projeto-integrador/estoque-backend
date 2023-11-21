import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function RelatorioSaldoDoc(): MethodDecorator {
    return applyDecorators(
        ApiQuery({
            name: 'produtoIds',
            required: false,
            description: 'Ids dos produtos',
            type: Array<Number>, // Tipo do parâmetro (opcional)
          }),
        ApiQuery({
            name: 'dataFinal',
            required: false,
            description: 'Data inicio busca da movimentação',
            type: Date, // Tipo do parâmetro (opcional)
        }),
    );
}
