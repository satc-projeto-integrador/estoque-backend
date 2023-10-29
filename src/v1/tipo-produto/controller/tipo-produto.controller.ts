import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TipoProdutoService } from '../services/tipo-produto.service';
import { CreateTipoProdutoDto } from '../dto/create-tipo-produto.dto';
import { UpdateTipoProdutoDto } from '../dto/update-tipo-produto.dto';
import { ILike } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de Produtos')
@Controller({ path: 'tipos-produtos', version: '1' })
@ApiBearerAuth()
export class TipoProdutoController {
  constructor(private readonly service: TipoProdutoService) {}

  @Post()
  create(@Body() dto: CreateTipoProdutoDto) {
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
  update(
    @Param('id') id: string,
    @Body() updateprodutosDto: UpdateTipoProdutoDto,
  ) {
    return this.service.update(+id, updateprodutosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
