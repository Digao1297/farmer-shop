import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/product-type/models/product-type.model';
import { Product } from './models/product.model';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductType])],
  controllers: [ProductController],
  exports: [TypeOrmModule],
})
export class ProductModule {}
