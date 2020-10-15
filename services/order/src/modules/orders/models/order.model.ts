import { AggregateRoot } from '@nestjs/cqrs';
import { OrderUpdatedEvent } from '../events/impl/order-updated.event';
import { OrderCreatedEvent } from '../events/impl/order-created.event';

export class Order extends AggregateRoot {
  constructor(private readonly orderId: string) {
    super();
  }

  createOrder(productId: string, amount: number, state: string) {
    this.apply(new OrderCreatedEvent(this.orderId, productId, amount, state));
  }

  updateOrder(state: string) {
    this.apply(new OrderUpdatedEvent(this.orderId, state));
  }
}
