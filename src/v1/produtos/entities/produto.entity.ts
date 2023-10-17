import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'produtos' })
export class Produto extends CommonEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  valor: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  tipo: string;
}
