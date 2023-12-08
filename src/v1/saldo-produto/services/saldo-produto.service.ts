import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaldoProduto } from '../entities/saldo-produto.entity';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { Repository, FindManyOptions } from 'typeorm';
import { Produto } from 'src/v1/produtos/entities/produto.entity';
import { Movimentacao } from 'src/v1/movimentacao/entities/movimentacao.entity';
import { MovimentacaoProduto } from 'src/v1/movimentacao/entities/movimentacao-produto.entity';

type RelatorioFilterOptions = { produtoIds?: number[], dataFinal?: Date }

@Injectable()
export class SaldoProdutoService {
	constructor(
		@InjectRepository(SaldoProduto)
		private repository: Repository<SaldoProduto>,
		@InjectRepository(MovimentacaoProduto)
		private repositoryMovimentacao: Repository<MovimentacaoProduto>,
	) { }

	private async loadOrCreateSaldo(produto: Produto): Promise<SaldoProduto> {
		const saldo = await this.repository.findOneBy({ produto: { id: produto.id } });
		if (saldo) return saldo;

		return this.repository.save({
			produto,
			quantidade: 0
		})
	}

	async entrada(produto: Produto, quantidade: number): Promise<SaldoProduto> {
		const saldo = await this.loadOrCreateSaldo(produto);
		saldo.quantidade += quantidade;
		return this.repository.save(saldo);
	}

	async saida(produto: Produto, quantidade: number): Promise<SaldoProduto> {
		const saldo = await this.loadOrCreateSaldo(produto);
		saldo.quantidade -= quantidade;

		if (saldo.quantidade < 0) {
			throw new HttpException({ message: "O saldo ficaria negativo" }, HttpStatus.BAD_REQUEST)
		}

		return this.repository.save(saldo);
	}

	async findAll(page: number = 1, rpp: number = 10, options?: FindManyOptions<SaldoProduto>): Promise<Page<SaldoProduto>> {
		return findPaginated(this.repository, page, rpp, options);
	}

	async findOne(id: number): Promise<SaldoProduto> {
		return this.repository.findOneBy({ id });
	}

	async findEstoqueBaixo(page: number = 1, rpp: number = 10, q: string): Promise<Page<SaldoProduto>> {
		const query = this.repository.createQueryBuilder("saldoProduto")
			.leftJoinAndSelect("saldoProduto.produto", "produto")
			.where("saldoProduto.quantidade <= produto.quantidadeMinima")
			.skip((page - 1) * rpp)
			.take(rpp);
		
		if (q) {
			query.andWhere("produto.descricao ilike :q", { q: `%${q}%` });
		}

		const [ saldoProdutos, count ] = await query.getManyAndCount();

		return {
			list: saldoProdutos,
			totalCount: count,
			page,
			rpp,
		}
	}

	async relatorioSaldo(
		page: number,
		rpp: number,
		{
		  produtoIds,
		  dataFinal,
		}: RelatorioFilterOptions
	): Promise<Page<any>> {
		const queryBuilder = this.repositoryMovimentacao.createQueryBuilder("movimentacaoProduto")
		  .select([
			"produto.id",
			"produto.descricao",
			`SUM(CASE WHEN tipoMovimentacao.tipo = 'Entrada' THEN movimentacaoProduto.quantidade ELSE -"movimentacaoProduto"."quantidade" END) AS saldo`,
		  ])
		  .innerJoin("movimentacaoProduto.movimentacao", "movimentacao")
		  .innerJoin("movimentacaoProduto.produto", "produto")
		  .innerJoin("movimentacao.tipoMovimentacao", "tipoMovimentacao")
		  .groupBy("produto.id")
		  .addGroupBy("produto.descricao")
		  .take(rpp)
		  .skip((page - 1) * rpp);
	
		if (produtoIds?.length) {
		  queryBuilder.andWhere("movimentacaoProduto.produto_id IN (:...produtoIds)", { produtoIds });
		}

		if (dataFinal) {
		  queryBuilder.andWhere("movimentacao.data_movimentacao <= :dataFinal", { dataFinal });
		}
		
		const result = await queryBuilder.getRawMany();
	
		// precisa colocar o tipo correto
		const resultPage: Page<any> = {
		  page,
		  rpp,
		  list: result,
		  totalCount: await queryBuilder.getCount()
		};
		return resultPage;
	}

}

