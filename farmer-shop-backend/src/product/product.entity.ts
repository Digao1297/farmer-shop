import { Exclude } from 'class-transformer';
import { ProductType } from 'src/product-type/product-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  // @ManyToOne(
  //   type => ProductType,
  //   producttype => producttype.products,
  // )
  // producttype: ProductType;
  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
