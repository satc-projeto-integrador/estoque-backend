import { Injectable } from '@nestjs/common';
import { CreateTipoMovimentacaoDto } from '../dto/create-tipo-movimentacao.dto';
import { UpdateTipoMovimentacaoDto } from '../dto/update-tipo-movimentacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoMovimentacao } from '../entities/tipo-movimentacao.entity';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';

@Injectable()
export class TipoMovimentacaoService {
  constructor(
    @InjectRepository(TipoMovimentacao)
    private repository: Repository<TipoMovimentacao>,
  ) { }

  async create(createDto: CreateTipoMovimentacaoDto): Promise<TipoMovimentacao> {
    return this.repository.save(createDto);
  }

  async findAll(
    page: number = 1,
    rpp: number = 10,
    options?: FindManyOptions<TipoMovimentacao>,
  ): Promise<Page<TipoMovimentacao>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number): Promise<TipoMovimentacao> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateDto: UpdateTipoMovimentacaoDto): Promise<UpdateResult> {
    return this.repository.update({ id }, updateDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
