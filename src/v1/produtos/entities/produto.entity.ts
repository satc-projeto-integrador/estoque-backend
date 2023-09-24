import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'produtos' })
export class produtos extends CommonEntity {
    @Column({ type: 'varchar', length: 100, nullable: false })
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    senha: string;
}
