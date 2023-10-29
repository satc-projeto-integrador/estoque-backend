import { CommonEntity } from "../../../common/entities/common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MovimentacaoProduto } from "./movimentacao-produto.entity";
import { TipoMovimentacao } from "src/v1/tipo-movimentacao/entities/tipo-movimentacao.entity";
import { ColumnNumericTransformer } from "src/common/typeorm-transformers/numeric.transformer";

@Entity({ name: 'movimentacoes' })
export class Movimentacao extends CommonEntity {
    @Column({ type: 'date' })
    dataMovimentacao: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0,
        transformer: new ColumnNumericTransformer()
    })
    valorTotal: number;

    @Column({ length: 150, nullable: true })
    observacao?: string;

    @ManyToOne(() => TipoMovimentacao)
    tipoMovimentacao: TipoMovimentacao;

    @OneToMany(() => MovimentacaoProduto, (entity) => entity.movimentacao, { cascade: true })
    movimentacaoProdutos: MovimentacaoProduto[];
}
