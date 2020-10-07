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
import { ProductTypeResponseDto } from 'src/product-type/dto/product-type.response.dto';
import { ProductType } from 'src/product-type/product-type.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductResponseDto } from './dto/product.response.dto';
import { Product } from './product.entity';

@ApiTags('product')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Get()
  async index(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Get(':id')
  async show(@Param('id') id: string): Promise<Product> {
    return await this.productRepository.findOneOrFail(id);
  }

  @ApiCreatedResponse({
    type: ProductTypeResponseDto,
  })
  @Post()
  async store(@Body(new ValidationPipe()) body: ProductDto): Promise<Product> {
    // const producttype = await this.productTypeRepository.findOneOrFail(
    //   +body.producttypeid,
    // );
    const product = await this.productRepository.create(body);
    // product.producttype = producttype;
    return await this.productRepository.save(product);
  }

  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: ProductDto,
  ): Promise<Product> {
    // const producttype = await this.productTypeRepository.findOneOrFail(
    //   +body.producttypeid,
    // );
    const product = await this.productRepository.create(body);
    // product.producttype = producttype;
    await this.productRepository.update({ id: +id }, product);
    return await this.productRepository.findOneOrFail(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    await this.productRepository.delete(id);
  }
}
