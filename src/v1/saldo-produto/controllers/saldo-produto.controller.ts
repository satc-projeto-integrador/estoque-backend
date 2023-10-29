import { Controller, Get, Query } from '@nestjs/common';
import { SaldoProdutoService } from '../services/saldo-produto.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'saldo-produtos', version: '1' })
@ApiTags('Saldo de Produto/Estoque')
export class SaldoProdutoController {
  constructor(private readonly saldoProdutoService: SaldoProdutoService) { }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('rpp') rpp: number,
  ) {
    return this.saldoProdutoService.findAll(page, rpp, {
      order: { id: 'desc' },
      relations: ['produto']
    });
  }

}
