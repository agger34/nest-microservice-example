import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  txId: string;

  @Prop()
  orderId: string;

  @Prop()
  productId: string;

  @Prop()
  amount: number;

  @Prop()
  state: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
