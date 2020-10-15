import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ReadOrderQuery } from './queries/impl';
import { Order } from './models/order.model';
import {
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('query-orders')
@Controller('query/orders')
export class OrdersQueryController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Read an order' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Read an order.' })
  async readOrder(@Param('id') id: string): Promise<Order> {
    return this.queryBus.execute(new ReadOrderQuery(id));
  }
}
