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
import { InventarioService } from '../services/inventario.service';
import { CreateInventarioDto } from '../dto/create-inventario.dto';
import { UpdateInventarioDto } from '../dto/update-inventario.dto';
import { ILike } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Inventários')
@Controller({ path: 'inventarios', version: '1' })
@ApiBearerAuth()
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post()
  create(@Body() createprodutosDto: CreateInventarioDto) {
    return this.inventarioService.create(createprodutosDto);
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
    return this.inventarioService.findAll(page, rpp, {
      where,
      order: { id: 'desc' },
      relations: ['inventarioProdutos'],
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateInventarioDto) {
    return this.inventarioService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventarioService.remove(+id);
  }
}
