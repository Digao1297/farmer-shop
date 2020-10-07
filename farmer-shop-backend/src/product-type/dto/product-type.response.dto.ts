import { ApiProperty } from '@nestjs/swagger';

export class ProductTypeResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;

  // @OneToMany(
  //   type => Product,
  //   product => product.producttype,
  // )
  // products: Product[];
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
