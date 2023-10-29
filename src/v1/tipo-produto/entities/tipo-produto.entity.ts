import { Produto } from 'src/v1/produtos/entities/produto.entity';
import { CommonEntity } from '../../../common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'tipos_produtos' })
export class TipoProduto extends CommonEntity {
  @Column({ name: 'descricao', length: 50, nullable: false })
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.tipoProduto)
  produtos: Produto[];
}
