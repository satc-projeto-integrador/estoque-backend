import { Column, Entity } from "typeorm";

@Entity({ name: 'usuarios' })
export class Usuario {
    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    senha: string;
}
