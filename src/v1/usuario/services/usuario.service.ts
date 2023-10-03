import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { EncryptionService } from 'src/common/services/encryption/encryption.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private repository: Repository<Usuario>,
    private encryptionService: EncryptionService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario: Usuario = this.repository.create(createUsuarioDto);

    if (usuario.senha) {
      usuario.senha = await this.encryptionService.hashPassword(usuario.senha);
    }

    return this.repository.save(usuario);
  }

  async findAll(
    page: number = 1,
    rpp: number = 10,
    options?: FindManyOptions<Usuario>,
  ): Promise<Page<Usuario>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number): Promise<Usuario> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UpdateResult> {
    return this.repository.update({ id }, updateUsuarioDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.repository.findOneBy({ email });
  }
}
