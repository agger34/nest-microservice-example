import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Order } from '../../models/order.model';
import { UpdateOrderCommand } from '../impl/update-order.command';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: UpdateOrderCommand) {
    console.log(clc.greenBright('UpdateOrderCommand...'));

    const { orderId, state } = command;
    const order = this.publisher.mergeObjectContext(new Order(orderId));
    order.updateOrder(state);
    order.commit();
  }
}
