import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { TransactionRepository } from '../../repository/transaction.repository';
import { TransactionCreatedEvent } from '../impl/transaction-created.event';

@EventsHandler(TransactionCreatedEvent)
export class TransactionCreatedHandler implements IEventHandler<TransactionCreatedEvent> {
  constructor(private readonly repository: TransactionRepository) {}
  handle(event: TransactionCreatedEvent) {
    // TODO => save data in event store collection
    
    console.log(clc.greenBright('TransactionCreatedEvent...'));
    this.repository.create(event);
  }
}
