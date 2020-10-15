import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateOrderCommand } from './commands/impl/update-order.command';
import { CreateOrderCommand } from './commands/impl/create-order.command';
import { CreateOrderDto } from './interfaces/create-order-dto.interface';
import { ReadOrderQuery } from './queries/impl';
import { v4 as uuidv4 } from 'uuid';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderStateConst } from '../shared/constants/order-state.const';

@ApiTags('command-orders')
@Controller('command/orders')
export class OrdersCommandController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Create an order.' })
  async createOrder(@Body() dto: CreateOrderDto) {
    const orderId = uuidv4();
    // generate orderId and fixed amount = 50
    return this.commandBus.execute(
      new CreateOrderCommand(
        orderId,
        dto.productId,
        50,
        OrderStateConst.CREATED,
      ),
    );
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cancel an order.' })
  async cancelOrder(@Param('id') id: string) {
    const oldOrder = await this.queryBus.execute(new ReadOrderQuery(id));
    if (
      oldOrder.state == OrderStateConst.DELIVERED ||
      oldOrder.state == OrderStateConst.CANCELLED
    ) {
      throw new BadRequestException();
    }
    return this.commandBus.execute(
      new UpdateOrderCommand(id, OrderStateConst.CANCELLED),
    );
  }
}
