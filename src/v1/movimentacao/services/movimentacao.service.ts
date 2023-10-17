import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { CreateMovimentacaoDto } from 'src/v1/movimentacao/dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from 'src/v1/movimentacao/dto/update-movimentacao.dto';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { Movimentacao } from '../entities/movimentacao.entity';

@Injectable()
export class MovimentacaoService {

  constructor(
    @InjectRepository(Movimentacao)
    private repository: Repository<Movimentacao>,
  ) {

  }
  async create(createDto: CreateMovimentacaoDto): Promise<Movimentacao> {
    return this.repository.save(createDto);
  }

  async findAll(page: number = 1, rpp: number = 10, options?: FindManyOptions<Movimentacao>): Promise<Page<Movimentacao>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number): Promise<Movimentacao> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateDto: UpdateMovimentacaoDto): Promise<UpdateResult> {
    return this.repository.update({ id }, updateDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
