import { AggregateRoot } from '@nestjs/cqrs';
import { TransactionCreatedEvent } from '../events/impl/transaction-created.event';

export class Transaction extends AggregateRoot {
  constructor(private readonly txId: string) {
    super();
  }

  createTransaction(
    orderId: string,
    productId: string,
    amount: number,
    state: string,
  ) {
    this.apply(
      new TransactionCreatedEvent(this.txId, orderId, productId, amount, state),
    );
  }
}
