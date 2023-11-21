import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventarioDto } from '../dto/create-inventario.dto';
import { UpdateInventarioDto } from '../dto/update-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { Repository, FindManyOptions, UpdateResult, MoreThan, In, FindOptionsWhere } from 'typeorm';
import { Inventario } from '../entities/inventario.entity';
import { InventarioProduto } from '../entities/inventario-produto.entity';
import { SaldoProduto } from 'src/v1/saldo-produto/entities/saldo-produto.entity';
import { UpdateInventarioProdutoDto } from '../dto/update-inventario-produto.dto';

@Injectable()
export class InventarioProdutoService {
  constructor(
    @InjectRepository(InventarioProduto)
    private repository: Repository<InventarioProduto>,
  ) {}

  async findAll(
    inventarioId: number,
    page: number = 1,
    rpp: number = 10,
    options?: FindManyOptions<InventarioProduto>,
  ): Promise<Page<InventarioProduto>> {
    let where = options?.where || { };
    
    if (Array.isArray(where)) {
      where = where.map(w =>w.inventario = { id: inventarioId });
    } else {
      where.inventario = { id: inventarioId };
    }

    return findPaginated(this.repository, page, rpp, {
      ...options,
      where,
    });
  }

  async findOne(id: number): Promise<InventarioProduto> {
    return this.repository.findOne({
      where: { id },
      relations: ['produto']
    });
  }

  async update(id: number, updateDto: UpdateInventarioProdutoDto): Promise<UpdateResult> {
    const entity = await this.findOne(id);
    
    if (entity.quantidadeEstoque < updateDto.quantidadeEncontrada) {
      throw new HttpException("A quantidade encontrada não pode ser maior que a quantidade do inventário", HttpStatus.BAD_REQUEST)
    }

    return this.repository.update({ id }, updateDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
