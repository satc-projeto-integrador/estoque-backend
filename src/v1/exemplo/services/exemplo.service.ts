import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { CreateUsuarioDto } from 'src/v1/usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/v1/usuario/dto/update-usuario.dto';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { CreateExemploDto } from '../dto/create-exemplo.dto';
import { UpdateExemploDto } from '../dto/update-exemplo.dto';
import { Exemplo } from '../entities/exemplo.entity';

@Injectable()
export class ExemploService {

  constructor(
    @InjectRepository(Exemplo)
    private repository: Repository<Exemplo>,
  ) {

  }
  async create(createDto: CreateExemploDto): Promise<Exemplo> {
    return this.repository.save(createDto);
  }

  async findAll(page: number = 1, rpp: number = 10, options?: FindManyOptions<Exemplo>): Promise<Page<Exemplo>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number): Promise<Exemplo> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateDto: UpdateExemploDto): Promise<UpdateResult> {
    return this.repository.update({ id }, updateDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
