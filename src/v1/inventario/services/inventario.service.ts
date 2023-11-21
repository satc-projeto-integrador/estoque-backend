import { Injectable } from '@nestjs/common';
import { CreateInventarioDto } from '../dto/create-inventario.dto';
import { UpdateInventarioDto } from '../dto/update-inventario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { Repository, FindManyOptions, UpdateResult, MoreThan, In } from 'typeorm';
import { Inventario } from '../entities/inventario.entity';
import { InventarioProduto } from '../entities/inventario-produto.entity';
import { SaldoProduto } from 'src/v1/saldo-produto/entities/saldo-produto.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private repository: Repository<Inventario>,
    @InjectRepository(SaldoProduto)
    private repositorySaldo: Repository<SaldoProduto>,
  ) {}
  
  async create(createDto: CreateInventarioDto): Promise<Inventario> {
    const inventarioProdutos: Partial<InventarioProduto>[] = [];
    let produtosSaldo: SaldoProduto[] = [];

    console.log('criando inventário')
    if (!createDto.produtos?.length) {
      console.log('nao tem produto adicionando todos')
      produtosSaldo = await this.repositorySaldo.find({ 
        where: { quantidade: MoreThan(0) },
        relations: ['produto']
      });
    } else {
      console.log({ produtosIds: createDto.produtos.map(p => p.id) })
      produtosSaldo = await this.repositorySaldo.find({ 
        where: { produto: { id: In(createDto.produtos.map(p => p.id)) } },
        relations: ['produto']
      });

      console.log(await this.repositorySaldo.find({ 
        where: { produto: { id: In(createDto.produtos.map(p => p.id)) } },
        relations: ['produto']
      }))
    }

    produtosSaldo.map(p => inventarioProdutos.push({ 
      produto: p.produto, 
      quantidadeEstoque: p.quantidade
    }))

    return await this.repository.save({
      ...createDto,
      inventarioProdutos
    });
  }

  async findAll(
    page: number = 1,
    rpp: number = 10,
    options?: FindManyOptions<Inventario>,
  ): Promise<Page<Inventario>> {
    return findPaginated(this.repository, page, rpp, options);
  }

  async findOne(id: number): Promise<Inventario> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDto: UpdateInventarioDto): Promise<UpdateResult> {
    return this.repository.update({ id }, updateDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }
}
