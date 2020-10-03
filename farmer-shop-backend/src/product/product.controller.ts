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
import { ProductType } from 'src/product-type/models/product-type.model';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './models/product.model';

@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  @Get()
  async index(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Product> {
    return await this.productRepository.findOneOrFail(id);
  }

  @Post()
  async store(@Body() body: ProductDto): Promise<Product> {
    const producttype = await this.productTypeRepository.findOneOrFail(
      +body.producttypeid,
    );
    const product = await this.productRepository.create(body);
    product.producttype = producttype;
    return await this.productRepository.save(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: ProductDto,
  ): Promise<any> {
    const producttype = await this.productTypeRepository.findOneOrFail(
      +body.producttypeid,
    );
    const product = await this.productRepository.create(body);
    product.producttype = producttype;
    await this.productRepository.update({ id: +id }, product);
    return await this.productRepository.findOneOrFail(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    await this.productRepository.delete(id);
  }
}
