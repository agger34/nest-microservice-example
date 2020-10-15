import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { CreateOrderDto } from '../interfaces/create-order-dto.interface';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async updateByOrderId(orderDto): Promise<Order> {
    return this.orderModel.updateOne({ orderId: orderDto.orderId}, orderDto);
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findByOrderId(orderId: string): Promise<Order> {
    return this.orderModel.findOne({ orderId: orderId }).exec();
  }
}
