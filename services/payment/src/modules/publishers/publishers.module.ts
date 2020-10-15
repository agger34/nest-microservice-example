import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '../config/config.service';
import { QueueConst } from '../shared/constants/queue.const';
import { OrderClientService } from './order-client.service';
const configService = new ConfigService(`.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: QueueConst.ORDER_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [configService.get('RABBITMQ_URL')],
          queue: QueueConst.ORDER_QUEUE,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [OrderClientService],
  exports: [OrderClientService],
})
export class PublishersModule {}
