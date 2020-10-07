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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductResponseDto } from 'src/product/dto/product.response.dto';
import { Repository } from 'typeorm';
import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeResponseDto } from './dto/product-type.response.dto';
import { ProductType } from './product-type.entity';

@ApiTags('producttype')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('producttype')
export class ProductTypeController {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Get()
  async index(): Promise<ProductType[]> {
    return await this.productTypeRepository.find();
  }
  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Get(':id')
  async show(@Param('id') id: string): Promise<ProductType> {
    return await this.productTypeRepository.findOneOrFail(id);
  }
  @ApiCreatedResponse({
    type: ProductResponseDto,
  })
  @Post()
  async store(
    @Body(new ValidationPipe()) body: ProductTypeDto,
  ): Promise<ProductType> {
    const productType = this.productTypeRepository.create(body);
    return await this.productTypeRepository.save(productType);
  }
  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: ProductTypeDto,
  ): Promise<ProductType> {
    await this.productTypeRepository.update({ id: +id }, body);
    return await this.productTypeRepository.findOneOrFail(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    await this.productTypeRepository.delete(id);
  }
}
