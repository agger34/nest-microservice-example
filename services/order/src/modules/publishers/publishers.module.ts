import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '../config/config.service';
import { QueueConst } from '../shared/constants/queue.const';
import { PaymentClientService } from './payment-client.service';
const configService = new ConfigService(`.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: QueueConst.PAYMENT_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [configService.get('RABBITMQ_URL')],
          queue: QueueConst.PAYMENT_QUEUE
        },
      },
    ]),
  ],
  controllers: [],
  providers: [PaymentClientService],
  exports: [PaymentClientService],
})
export class PublishersModule {}