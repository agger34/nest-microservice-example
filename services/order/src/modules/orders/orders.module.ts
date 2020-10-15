import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '../config/config.service';
import { PublishersModule } from '../publishers/publishers.module';
import { BullQueueConst } from '../shared/constants/bull-queue.const';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { OrdersCommandController } from './orders.command.controller';
import { OrdersQueryController } from './orders.query.controller';
import { QueryHandlers } from './queries/handlers';
import { OrderProcessor } from './queues/order.processor';
import { OrderRepository } from './repository/order.repository';
import { OrdersSagas } from './sagas/orders.sagas';
import { Order, OrderSchema } from './schemas/order.schema';
const configService = new ConfigService(`.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CqrsModule,
    PublishersModule,
    BullModule.registerQueue({
      name: BullQueueConst.ORDER_QUEUE_NAME,
      redis: {
        host: configService.get('REDIS_URL'),
        port: 6379,
      },
    }),
  ],
  controllers: [OrdersCommandController, OrdersQueryController],
  providers: [
    OrderRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    OrdersSagas,
    OrderProcessor,
  ],
})
export class OrdersModule {}
