import { Produto } from "src/v1/produtos/entities/produto.entity";
import { CommonEntity } from "../../../common/entities/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Movimentacao } from "./movimentacao.entity";
import { ColumnNumericTransformer } from "src/common/typeorm-transformers/numeric.transformer";

@Entity({ name: 'movimentacoes_produtos' })
export class MovimentacaoProduto extends CommonEntity {
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0,
        transformer: new ColumnNumericTransformer()
    })
    valor: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        transformer: new ColumnNumericTransformer()
    })
    quantidade: number;

    @ManyToOne(() => Produto)
    produto: Produto;

    @ManyToOne(() => Movimentacao, (entity) => entity.movimentacaoProdutos)
    movimentacao: Movimentacao;
}
