import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaldoProduto } from '../entities/saldo-produto.entity';
import { findPaginated } from 'src/common/utils';
import { Page } from 'src/types/interfaces';
import { Repository, FindManyOptions } from 'typeorm';
import { Produto } from 'src/v1/produtos/entities/produto.entity';

@Injectable()
export class SaldoProdutoService {
	constructor(
		@InjectRepository(SaldoProduto)
		private repository: Repository<SaldoProduto>,
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

}

