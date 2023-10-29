import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovimentacaoService } from '../services/movimentacao.service';
import { CreateMovimentacaoDto } from '../dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from '../dto/update-movimentacao.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'movimentacoes', version: '1' })
@ApiTags('Movimentacoes')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) { }

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
