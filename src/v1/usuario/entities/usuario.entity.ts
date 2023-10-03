import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entities/common.entity';
import { CargoEnum } from '../../../types/enums';

@Entity({ name: 'usuarios' })
export class Usuario extends CommonEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  senha: string;

  @Column({ type: 'enum', enum: CargoEnum, nullable: true })
  cargo?: CargoEnum;
}
