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
import { ExemploService } from '../services/exemplo.service';
import { CreateExemploDto } from '../dto/create-exemplo.dto';
import { UpdateExemploDto } from '../dto/update-exemplo.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'exemplos', version: '1' })
@ApiTags('Exemplos')
export class ExemploController {
  constructor(private readonly exemploService: ExemploService) {}

  @Post()
  create(@Body() createExemploDto: CreateExemploDto) {
    return this.exemploService.create(createExemploDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('rpp') rpp: number) {
    return this.exemploService.findAll(page, rpp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exemploService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExemploDto: UpdateExemploDto) {
    return this.exemploService.update(+id, updateExemploDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exemploService.remove(+id);
  }
}
