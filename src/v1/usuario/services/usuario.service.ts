import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private repository: Repository<Usuario>,
  ) {

  }
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.repository.save(createUsuarioDto);
  }

  async findAll(page: number = 1, rpp: number = 10, options?: FindManyOptions<Usuario>): Promise<Page<Usuario>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number): Promise<Usuario> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UpdateResult> {
    return this.repository.update({ id }, updateUsuarioDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
