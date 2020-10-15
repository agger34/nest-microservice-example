import {
  ApiProperty
} from '@nestjs/swagger';
import {
  IsNotEmpty
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  productId: string;
}
