import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FindOptionsWhere, ILike } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InventarioProdutoService } from '../services/inventario-produto.service';
import { InventarioProduto } from '../entities/inventario-produto.entity';
import { UpdateInventarioProdutoDto } from '../dto/update-inventario-produto.dto';

@ApiTags('Produtos do Inventário')
@Controller({ path: 'inventarios/:inventarioId/produtos', version: '1' })
@ApiBearerAuth()
export class InventarioProdutoController {
  constructor(private readonly service: InventarioProdutoService) {}


  @Get()
  findAll(
    @Param('inventarioId') inventarioId: number,
    @Query('page') page: number,
    @Query('rpp') rpp: number,
    @Query('q') q: string,
  ) {
    let where: FindOptionsWhere<InventarioProduto>;
    if (q) {
      where = {
        produto: { descricao: ILike(`%${q}%`) },
      };
    }

    return this.service.findAll(inventarioId, page, rpp, {
      where,
      order: { id: 'desc' },
      relations: ['produto'],
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateInventarioProdutoDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
