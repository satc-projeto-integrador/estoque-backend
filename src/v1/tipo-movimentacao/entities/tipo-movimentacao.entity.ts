import { CommonEntity } from "src/common/entities/common.entity";
import { TipoMovimentacaoEnum } from "src/types/enums";
import { Column, Entity } from "typeorm";

@Entity({ name: 'tipos_movimentacoes' })
export class TipoMovimentacao extends CommonEntity {
    @Column({ type: 'varchar', length: 100, nullable: false })
    descricao: string;

    @Column({ type: 'enum', enum: TipoMovimentacaoEnum, nullable: false })
    tipo: TipoMovimentacaoEnum;
}

