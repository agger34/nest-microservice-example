import { Process, Processor } from '@nestjs/bull';
import { CommandBus } from '@nestjs/cqrs';
import { Job } from 'bull';
import { BullQueueConst } from '../../shared/constants/bull-queue.const';
import { OrderStateConst } from '../../shared/constants/order-state.const';
import { UpdateOrderCommand } from '../commands/impl/update-order.command';

@Processor(BullQueueConst.ORDER_QUEUE_NAME)
export class OrderProcessor {
  constructor(private readonly commandBus: CommandBus) {}

  @Process(BullQueueConst.DELIVER_ORDER_PROCESS)
  handleDeliverOrder(job: Job) {
    console.log('Start delivering...');
    this.commandBus.execute(
      new UpdateOrderCommand(job.data.orderId, OrderStateConst.DELIVERED),
    );
    console.log('Delivering completed');
  }
}
