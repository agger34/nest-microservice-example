import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Transaction } from '../../models/transaction.model';
import { CreateTransactionCommand } from '../impl/create-transaction.command';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactiondHandler implements ICommandHandler<CreateTransactionCommand> {
  constructor(
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateTransactionCommand) {
    console.log(clc.greenBright('CreateTransactionCommand...'));

    const { txId, orderId, productId, amount, state } = command;
    const transaction = this.publisher.mergeObjectContext(new Transaction(txId));
    transaction.createTransaction(orderId, productId, amount, state);
    transaction.commit();
  }
}
