import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  txId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  state: string;
}
