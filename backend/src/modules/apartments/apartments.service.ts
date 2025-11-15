import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepo: Repository<Apartment>,
  ) {}

  findAll() {
    return this.apartmentRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const apt = await this.apartmentRepo.findOne({ where: { id } });
    if (!apt) throw new NotFoundException('Apartment not found');
    return apt;
  }

  create(dto: CreateApartmentDto) {
    const apartment = this.apartmentRepo.create(dto);
    return this.apartmentRepo.save(apartment);
  }
}
