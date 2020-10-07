import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeModule } from './product-type/product-type.module';
import { Connection } from 'typeorm';
import { ProductType } from './product-type/product-type.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { AddressModule } from './address/address.module';
import { Address } from './address/address.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [ProductType, Product, Address],
      synchronize: true,
    }),
    ProductTypeModule,
    ProductModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
