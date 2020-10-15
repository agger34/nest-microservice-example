import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PaymentClientService } from '../../publishers/payment-client.service';
import { OrderMessagePattern } from '../../shared/enum/order.enum';
import { OrderUpdatedEvent } from '../events/impl/order-updated.event';
import { OrderCreatedEvent } from '../events/impl/order-created.event';

@Injectable()
export class OrdersSagas {
  constructor(
    private readonly paymentClientService: PaymentClientService,
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
          return null;
        }),
      );
  }
}
