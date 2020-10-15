import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  orderId: string;

  @Prop()
  productId: string;

  @Prop()
  amount: number;

  @Prop()
  state: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);