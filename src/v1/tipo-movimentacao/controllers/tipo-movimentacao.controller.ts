import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TipoMovimentacaoService } from '../services/tipo-movimentacao.service';
import { CreateTipoMovimentacaoDto } from '../dto/create-tipo-movimentacao.dto';
import { UpdateTipoMovimentacaoDto } from '../dto/update-tipo-movimentacao.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ILike } from 'typeorm';


@ApiTags('Tipos de movimentacao')
@Controller({ path: 'tipos-movimentacao', version: '1' })
@ApiBearerAuth()
export class TipoMovimentacaoController {
  constructor(private readonly service: TipoMovimentacaoService) { }

  @Post()
  create(@Body() dto: CreateTipoMovimentacaoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('rpp') rpp: number,
    @Query('q') q: string,
  ) {
    let where;
    if (q) {
      where = {
        descricao: ILike(`%${q}%`),
      };
    }
    return this.service.findAll(page, rpp, {
      where,
      order: { id: 'desc' },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTipoMovimentacaoDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
