import { CommonEntity } from "../../../common/entities/common.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'movimentacoes' })
export class Movimentacao extends CommonEntity {
    @Column({ name: 'descricao', length: 50, nullable: false })
    descricao: string;
}
