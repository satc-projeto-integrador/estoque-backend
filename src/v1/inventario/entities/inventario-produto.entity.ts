import { CommonEntity } from "src/common/entities/common.entity";
import { ColumnNumericTransformer } from "src/common/typeorm-transformers/numeric.transformer";
import { Movimentacao } from "src/v1/movimentacao/entities/movimentacao.entity";
import { Produto } from "src/v1/produtos/entities/produto.entity";
import { Entity, Column, ManyToOne } from "typeorm";
import { Inventario } from "./inventario.entity";

@Entity({ name: 'inventarios_produtos' })
export class InventarioProduto extends CommonEntity {
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        transformer: new ColumnNumericTransformer()
    })
    quantidadeEstoque: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        transformer: new ColumnNumericTransformer(),
        default: '0'
    })
    quantidadeEncontrada: number;

    @ManyToOne(() => Produto)
    produto: Produto;

    @ManyToOne(() => Inventario, (entity) => entity.inventarioProdutos)
    inventario: Inventario;
}
