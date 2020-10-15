import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { OrderRepository } from '../../repository/order.repository';
import { OrderUpdatedEvent } from '../impl/order-updated.event';

@EventsHandler(OrderUpdatedEvent)
export class OrderUpdatedHandler implements IEventHandler<OrderUpdatedEvent> {
  constructor(private readonly repository: OrderRepository) {}
  handle(event: OrderUpdatedEvent) {
    // TODO => save data in event store collection
    
    console.log(clc.greenBright('OrderUpdatedEvent...'));
    this.repository.updateByOrderId(event);
  }
}
