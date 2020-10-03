import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './models/product-type.model';
import { ProductTypeController } from './product-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  controllers: [ProductTypeController],
  providers: [],
  exports: [TypeOrmModule],
})
export class ProductTypeModule {}
