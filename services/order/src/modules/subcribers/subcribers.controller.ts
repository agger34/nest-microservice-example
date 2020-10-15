import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import * as clc from 'cli-color';
import { UpdateOrderCommand } from '../orders/commands/impl/update-order.command';
import { OrderStateConst } from '../shared/constants/order-state.const';
import { PaymentMessagePattern } from '../shared/enum/payment.enum';
import { PaymentEventModel } from './eventModels/payment-event-model';

@Controller()
export class SubcribersController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern(PaymentMessagePattern.PAYMENT_CONFIRMED)
  handlePaymentConfirmed(data: PaymentEventModel) {
    console.log(clc.greenBright('handlePaymentConfirmed...'));
    this.commandBus.execute(
      new UpdateOrderCommand(data.orderId, OrderStateConst.CONFIRMED),
    );
  }

  @EventPattern(PaymentMessagePattern.PAYMENT_DECLINED)
  handlePaymentDeclined(data: PaymentEventModel) {
    console.log(clc.greenBright('handlePaymentDeclined...', data));
    this.commandBus.execute(
      new UpdateOrderCommand(data.orderId, OrderStateConst.CANCELLED),
    );
  }
}
