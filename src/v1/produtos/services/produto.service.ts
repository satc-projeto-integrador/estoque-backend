import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { Produto } from '../entities/produto.entity';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private repository: Repository<Produto>,
  ) {}
  async create(createDto: CreateProdutoDto): Promise<Produto> {
    return this.repository.save(createDto);
  }

  async findAll(
    page: number = 1,
    rpp: number = 10,
    options?: FindManyOptions<Produto>,
  ): Promise<Page<Produto>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number): Promise<Produto> {
    return this.repository.findOne({
      where: { id },
      relations: ['tipoProduto'],
    });
  }

  async update(id: number, updateDto: UpdateProdutoDto): Promise<UpdateResult> {
    return this.repository.update({ id }, updateDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
