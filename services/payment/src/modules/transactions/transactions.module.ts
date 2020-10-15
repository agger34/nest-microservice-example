import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PublishersModule } from '../publishers/publishers.module';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionsSagas } from './sagas/transactions.sagas';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    CqrsModule,
    PublishersModule,
  ],
  controllers: [],
  providers: [
    TransactionRepository,
    ...CommandHandlers,
    ...EventHandlers,
    TransactionsSagas,
  ],
})
export class TransactionsModule {}
