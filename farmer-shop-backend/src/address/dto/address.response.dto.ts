import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  district: string;
  @ApiProperty()
  street: string;
  @ApiProperty()
  number: number;
  @ApiProperty()
  complement: string;
  @ApiProperty()
  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
