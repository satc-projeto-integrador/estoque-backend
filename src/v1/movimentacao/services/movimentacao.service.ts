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
import { groupBy } from 'rxjs';
import { RelatorioMovimentacaoDto } from '../dto/relatorio-movimentacao.dto';

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
    const { id } = await this.repository.save(createDto);
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
    return this.repository.softDelete({ id });
  }

  async relMovimentacoes({ page, rpp, idProduto }: { page: number, rpp: number, idProduto?: number }): Promise<Page<RelatorioMovimentacaoDto>> {
    let queryBuilder = this.movimentacaoProdutoRepository.createQueryBuilder("movimentacaoProduto")
      .select([
        "produto.id",
        "produto.descricao",
        "tipoMovimentacao.id",
        "tipoMovimentacao.descricao",
        "tipoMovimentacao.tipo",
        "sum(movimentacaoProduto.valor) as valor",
        "sum(movimentacaoProduto.quantidade) as quantidade",
      ])
      .innerJoin("movimentacaoProduto.movimentacao", "movimentacao")
      .innerJoin("movimentacaoProduto.produto", "produto")
      .innerJoin("movimentacao.tipoMovimentacao", "tipoMovimentacao")
      .groupBy("produto.id")
      .addGroupBy("produto.descricao")
      .addGroupBy("tipoMovimentacao.id")
      .addGroupBy("tipoMovimentacao.descricao")
      .addGroupBy("tipoMovimentacao.tipo")
      .take(rpp)
      .skip((page - 1) * rpp);
  
    // Adiciona a cláusula WHERE condicional se idProd estiver definido
    if (idProduto !== undefined) {
      queryBuilder = queryBuilder.where("movimentacaoProduto.produto_id = :produtoId", { produtoId: idProduto });
    }
  
    const result = await queryBuilder.getRawMany();
  
    const resultPage: Page<RelatorioMovimentacaoDto> = {
      page,
      rpp,
      list: result,
      totalCount: 1
    };
    console.log(await queryBuilder.getSql())
    return resultPage;
  }
}
