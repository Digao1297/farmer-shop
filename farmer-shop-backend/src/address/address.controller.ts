import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressDto } from './dto/address.dto';
import { AddressResponseDto } from './dto/address.response.dto';

@ApiTags('address')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('address')
export class AddressController {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  @ApiOkResponse({
    type: AddressResponseDto,
  })
  @Get()
  async index(): Promise<AddressDto[]> {
    return await this.addressRepository.find();
  }

  @ApiCreatedResponse({
    type: AddressResponseDto,
  })
  @Post()
  async store(
    @Body(new ValidationPipe()) body: AddressDto,
  ): Promise<AddressDto> {
    const address = await this.addressRepository.create(body);
    return await this.addressRepository.save(address);
  }

  @ApiOkResponse({
    type: AddressResponseDto,
  })
  @Get(':id')
  async show(@Param('id') id: string): Promise<AddressDto> {
    return await this.addressRepository.findOneOrFail(id);
  }

  @ApiOkResponse({
    type: AddressResponseDto,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: AddressDto,
  ): Promise<AddressDto> {
    const address = await this.addressRepository.create(body);

    await this.addressRepository.update({ id: +id }, address);
    return await this.addressRepository.findOneOrFail(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    await this.addressRepository.delete(id);
  }
}
