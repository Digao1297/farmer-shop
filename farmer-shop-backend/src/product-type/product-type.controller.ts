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
import { ProductTypeDto } from './dto/product-type.dto';
import { ProductType } from './product-type.entity';

@Controller('producttype')
export class ProductTypeController {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  @Get()
  async index(): Promise<ProductType[]> {
    return await this.productTypeRepository.find();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<ProductType> {
    return await this.productTypeRepository.findOneOrFail(id);
  }

  @Post()
  async store(@Body() body: ProductTypeDto): Promise<ProductType> {
    const productType = this.productTypeRepository.create(body);
    return await this.productTypeRepository.save(productType);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: ProductTypeDto,
  ): Promise<any> {
    await this.productTypeRepository.update({ id: +id }, body);
    return await this.productTypeRepository.findOneOrFail(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    await this.productTypeRepository.delete(id);
  }
}
