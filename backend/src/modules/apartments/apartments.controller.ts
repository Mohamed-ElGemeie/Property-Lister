import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private service: ApartmentsService) {}

  @Get()
  async list() {
    const data = await this.service.findAll();
    return { data };
  }

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.service.findOne(id);
    return { data };
  }

  @Post()
  async create(@Body() dto: CreateApartmentDto) {
    const data = await this.service.create(dto);
    const { id } = data;
    return { data: { id } };
  }
}
