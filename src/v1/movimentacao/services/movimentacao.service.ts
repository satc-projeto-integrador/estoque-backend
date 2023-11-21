import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { CreateMovimentacaoDto } from 'src/v1/movimentacao/dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from 'src/v1/movimentacao/dto/update-movimentacao.dto';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { Movimentacao } from '../entities/movimentacao.entity';
import { SaldoProdutoService } from 'src/v1/saldo-produto/services/saldo-produto.service';
import { TipoMovimentacao } from 'src/v1/tipo-movimentacao/entities/tipo-movimentacao.entity';
import { TipoMovimentacaoEnum } from 'src/types/enums';
import { MovimentacaoProduto } from '../entities/movimentacao-produto.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MovimentacaoService {

  constructor(
    @InjectRepository(Movimentacao)
    private repository: Repository<Movimentacao>,
    @InjectRepository(MovimentacaoProduto)
    private movimentacaoProdutoRepository: Repository<MovimentacaoProduto>,
    private readonly saldoService: SaldoProdutoService,
  ) {

  }

  // todo colocar em uma unica transacao
  async create(createDto: CreateMovimentacaoDto): Promise<Movimentacao> {
    const quantidadeTotal = createDto?.movimentacaoProdutos?.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.quantidade ?? 0),
      0,
    );

    const { id } = await this.repository.save({ ...createDto, quantidadeTotal });
    const movimentacao = await this.repository.findOne({
      where: { id },
      relations: ["tipoMovimentacao", "movimentacaoProdutos", "movimentacaoProdutos.produto"]
    })

    for (const { produto, quantidade } of movimentacao.movimentacaoProdutos) {
      switch (movimentacao.tipoMovimentacao.tipo) {
        case TipoMovimentacaoEnum.ENTRADA: {
          await this.saldoService.entrada(produto, quantidade);
          break;
        }
        case TipoMovimentacaoEnum.SAIDA: {
          await this.saldoService.saida(produto, quantidade);
          break;
        }
        default: {
          throw new HttpException({ message: "Erro ao definir tipo de movimentacao" }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }
    }
    return movimentacao;
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
    const maxId = await this.repository.maximum('id');

    if (id !== maxId) {
      throw new HttpException("Só é possível reverter a movimentacão mais recente", HttpStatus.BAD_REQUEST);
    }

    const movimentacao = await this.repository.findOne({
      where: { id },
      relations: ["tipoMovimentacao", "movimentacaoProdutos", "movimentacaoProdutos.produto"]
    })

    for (const { produto, quantidade } of movimentacao.movimentacaoProdutos) {
      switch (movimentacao.tipoMovimentacao.tipo) {
        case TipoMovimentacaoEnum.ENTRADA: {
          await this.saldoService.saida(produto, quantidade);
          break;
        }
        case TipoMovimentacaoEnum.SAIDA: {
          await this.saldoService.entrada(produto, quantidade);
          break;
        }
        default: {
          throw new HttpException({ message: "Erro ao definir tipo de movimentacao" }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }
    }

    return this.repository.softDelete({ id });
  }
}
