import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Order } from '../../models/order.model';
import { CreateOrderCommand } from '../impl/create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand) {
    console.log(clc.greenBright('CreateOrderCommand...'));

    const { orderId, productId, amount, state } = command;
    const order = this.publisher.mergeObjectContext(new Order(orderId));
    order.createOrder(productId, amount, state);
    order.commit();
  }
}
