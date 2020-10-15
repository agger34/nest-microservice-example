import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { EventPattern } from "@nestjs/microservices";
import * as clc from 'cli-color';
import { TransactionStateConst } from "../shared/constants/transaction-state";
import { OrderMessagePattern } from "../shared/enum/order.enum";
import { CreateTransactionCommand } from "../transactions/commands/impl/create-transaction.command";
import { v4 as uuidv4 } from 'uuid';
import { OrderCreatedEventModel } from "./eventModels/order-created-event-model";

@Controller()
export class SubcribersController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @EventPattern(OrderMessagePattern.ORDER_CREATED)
  handleOrderCreated(data: OrderCreatedEventModel) {
    console.log(clc.greenBright('handleOrderCreated...'));
    const txId = uuidv4();
    const state = this.randomTransactionState();
    this.commandBus.execute(new CreateTransactionCommand(txId, data.orderId, data.productId, data.amount, state));
  }

  randomTransactionState() {
    return Math.random() >= 0.5 ? TransactionStateConst.CONFIRMED : TransactionStateConst.DECLINED;
  }
}
