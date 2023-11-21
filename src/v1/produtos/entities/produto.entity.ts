import { CommonEntity } from 'src/common/entities/common.entity';
import { ColumnNumericTransformer } from 'src/common/typeorm-transformers/numeric.transformer';
import { TipoProduto } from 'src/v1/tipo-produto/entities/tipo-produto.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'produtos' })
export class Produto extends CommonEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: new ColumnNumericTransformer() })
  quantidadeMinima: number;

  @ManyToOne(() => TipoProduto, (tipoProduto) => tipoProduto.produtos)
  tipoProduto: TipoProduto;
}
