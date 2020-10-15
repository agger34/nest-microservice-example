import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PublishersModule } from '../publishers/publishers.module';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { OrdersController } from './orders.controller';
import { QueryHandlers } from './queries/handlers';
import { OrderRepository } from './repository/order.repository';
import { OrdersSagas } from './sagas/orders.sagas';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CqrsModule,
    PublishersModule
  ],
  controllers: [OrdersController],
  providers: [
    OrderRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    OrdersSagas,
  ],
})
export class OrdersModule {}
