import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { produtosService } from '../services/produtos.service';
import { CadastroprodutosDto } from '../dto/cadastro-produto.dto';
import { UpdateprodutosDto } from '../dto/cadastro-produto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('produtoss')
@Controller({ path: 'produtoss', version: '1' })
export class produtosController {
  constructor(private readonly produtosService: produtosService) { }

  @Post()
  create(@Body() createprodutosDto: CadastroprodutosDto) {
    return this.produtosService.create(createprodutosDto);
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateprodutosDto: UpdateprodutosDto) {
    return this.produtosService.update(+id, updateprodutosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
