import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  @Get()
  async index(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  @Post()
  async store(@Body() body: AddressDto): Promise<Address> {
    const address = await this.addressRepository.create(body);
    return await this.addressRepository.save(address);
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Address> {
    return await this.addressRepository.findOneOrFail(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: AddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.create(body);

    await this.addressRepository.update({ id: +id }, address);
    return await this.addressRepository.findOneOrFail(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    await this.addressRepository.delete(id);
  }
}
