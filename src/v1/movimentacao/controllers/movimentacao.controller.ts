import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovimentacaoService } from '../services/movimentacao.service';
import { CreateMovimentacaoDto } from '../dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from '../dto/update-movimentacao.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'movimentacoes', version: '1' })
@ApiTags('Movimentacoes')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) { }
  
  @Get('rel-movimentacao')

  @ApiQuery({
    name: 'idProduto',
    required: false,
    description: 'Termo de busca opcional',
    type: Number, // Tipo do parâmetro (opcional)
  })

  relatorioMovimentacao(
    @Query('page') page: number,
    @Query('rpp') rpp: number,
    @Query('idProduto') idProduto?: number
  ) {
    return this.movimentacaoService.relMovimentacoes({ page, rpp, idProduto })
  }
  
  @Post()
  create(@Body() createMovimentacaoDto: CreateMovimentacaoDto) {
    return this.movimentacaoService.create(createMovimentacaoDto);
  }
  
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('rpp') rpp: number,
  ) {
    return this.movimentacaoService.findAll(page, rpp, {
      order: { id: 'desc' },
      relations: ['tipoMovimentacao']
    });
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimentacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimentacaoDto: UpdateMovimentacaoDto) {
    return this.movimentacaoService.update(+id, updateMovimentacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimentacaoService.remove(+id);
  }

}
