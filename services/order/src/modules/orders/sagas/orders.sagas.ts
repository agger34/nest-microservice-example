import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PaymentClientService } from '../../publishers/payment-client.service';
import { OrderMessagePattern } from '../../shared/enum/order.enum';
import { OrderUpdatedEvent } from '../events/impl/order-updated.event';
import { OrderCreatedEvent } from '../events/impl/order-created.event';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { OrderStateConst } from '../../shared/constants/order-state.const';
import { BullQueueConst } from '../../shared/constants/bull-queue.const';
import { ConfigService } from '../../config/config.service';
const configService = new ConfigService(`.env.${process.env.NODE_ENV}`);

@Injectable()
export class OrdersSagas {
  constructor(
    private readonly paymentClientService: PaymentClientService,
    @InjectQueue(BullQueueConst.ORDER_QUEUE_NAME) private readonly orderQueue: Queue
  ) { }

  @Saga()
  orderCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(OrderCreatedEvent),
        delay(1000),
        map(event => {
          console.log(clc.redBright('Inside [OrdersSagas] Saga'));
          this.paymentClientService.publish(OrderMessagePattern.ORDER_CREATED, event);
          return null;
        }),
      );
  }

  @Saga()
  orderUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(OrderUpdatedEvent),
        delay(1000),
        map(event => {
          console.log(clc.redBright('Inside [OrdersSagas] Saga'));

          // After X amount of seconds confirmed orders should automatically be moved to the delivered 
          if (event && event.state == OrderStateConst.CONFIRMED) {
            this.orderQueue.add(BullQueueConst.DELIVER_ORDER_PROCESS, {
              orderId: event.orderId,
            }, { delay: Number(configService.get('AUTO_DELIVER_ORDER_TIME')) });
          }
          return null;
        }),
      );
  }
}
