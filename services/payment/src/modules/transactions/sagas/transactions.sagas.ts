import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { OrderClientService } from '../../publishers/order-client.service';
import { TransactionStateConst } from '../../shared/constants/transaction-state';
import { PaymentMessagePattern } from '../../shared/enum/payment.enum';
import { TransactionCreatedEvent } from '../events/impl/transaction-created.event';

@Injectable()
export class TransactionsSagas {
  constructor(private readonly orderClientService: OrderClientService) {}

  @Saga()
  transactionCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TransactionCreatedEvent),
      delay(1000),
      map(event => {
        console.log(clc.redBright('Inside [TransactionsSagas] Saga'));

        const msgPattern =
          event.state === TransactionStateConst.CONFIRMED
            ? PaymentMessagePattern.PAYMENT_CONFIRMED
            : PaymentMessagePattern.PAYMENT_DECLINED;
        this.orderClientService.publish(msgPattern, event);
        return null;
      }),
    );
  };
}
