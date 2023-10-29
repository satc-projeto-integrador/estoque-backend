import { Injectable } from '@nestjs/common';
import { CreateTipoProdutoDto } from '../dto/create-tipo-produto.dto';
import { UpdateTipoProdutoDto } from '../dto/update-tipo-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoProduto } from '../entities/tipo-produto.entity';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { Page } from 'src/types/interfaces';
import { findPaginated } from 'src/common/utils';

@Injectable()
export class TipoProdutoService {
  constructor(
    @InjectRepository(TipoProduto)
    private repository: Repository<TipoProduto>,
  ) {}
  async create(createDto: CreateTipoProdutoDto): Promise<TipoProduto> {
    return this.repository.save(createDto);
  }

  async findAll(
    page: number = 1,
    rpp: number = 10,
    options?: FindManyOptions<TipoProduto>,
  ): Promise<Page<TipoProduto>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number): Promise<TipoProduto> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    updateDto: UpdateTipoProdutoDto,
  ): Promise<UpdateResult> {
    return this.repository.update({ id }, updateDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
