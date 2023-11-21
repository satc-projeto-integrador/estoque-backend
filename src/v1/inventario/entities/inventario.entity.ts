import { CommonEntity } from 'src/common/entities/common.entity';
import { SituacaoInventarioEnum } from 'src/types/enums';
import { Column, Entity, OneToMany } from 'typeorm';
import { InventarioProduto } from './inventario-produto.entity';

@Entity({ name: 'inventarios' })
export class Inventario extends CommonEntity {
  @Column({ name: 'descricao', length: 100 })
  descricao: string;

  @Column({ name: 'data_inicio', type: 'timestamp' })
  dataInicio: Date;

  @Column({ name: 'data_fim', type: 'timestamp', nullable: true })
  dataFim?: Date;

  @Column({ type: 'enum', enum: SituacaoInventarioEnum, nullable: false })
  situacao: SituacaoInventarioEnum;

  @OneToMany(() => InventarioProduto, (entity) => entity.inventario, { cascade: true })
  inventarioProdutos: InventarioProduto[];
}
