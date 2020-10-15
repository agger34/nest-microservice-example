import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { OrderRepository } from '../../repository/order.repository';
import { OrderCreatedEvent } from '../impl/order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(private readonly repository: OrderRepository) {}
  handle(event: OrderCreatedEvent) {
    // TODO => save data in event store collection

    console.log(clc.greenBright('OrderCreatedEvent...'));
    this.repository.create(event);
  }
}
