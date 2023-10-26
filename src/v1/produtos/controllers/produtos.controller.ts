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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProdutoService } from '../services/produto.service';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { ILike } from 'typeorm';

@ApiTags('Produtos')
@Controller({ path: 'produtos', version: '1' })
@ApiBearerAuth()
export class produtosController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() createprodutosDto: CreateProdutoDto) {
    return this.produtoService.create(createprodutosDto);
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
    return this.produtoService.findAll(page, rpp, {
      where,
      order: { id: 'desc' },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateprodutosDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateprodutosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
