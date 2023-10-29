import { Produto } from "src/v1/produtos/entities/produto.entity";
import { CommonEntity } from "../../../common/entities/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { ColumnNumericTransformer } from "src/common/typeorm-transformers/numeric.transformer";

@Entity({ name: 'saldos_produtos' })
export class SaldoProduto extends CommonEntity {
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: new ColumnNumericTransformer() })
    quantidade: number;

    @JoinColumn()
    @OneToOne(() => Produto)
    produto: Produto;
}
