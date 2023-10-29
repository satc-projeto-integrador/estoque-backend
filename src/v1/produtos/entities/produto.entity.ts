import { CommonEntity } from 'src/common/entities/common.entity';
import { TipoProduto } from 'src/v1/tipo-produto/entities/tipo-produto.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'produtos' })
export class Produto extends CommonEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  valor: string;

  @ManyToOne(() => TipoProduto, (tipoProduto) => tipoProduto.produtos)
  tipoProduto: TipoProduto;
}
