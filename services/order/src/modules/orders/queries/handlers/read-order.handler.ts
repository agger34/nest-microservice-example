import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrderRepository } from '../../repository/order.repository';
import { ReadOrderQuery } from '../impl';

@QueryHandler(ReadOrderQuery)
export class ReadOrderHandler implements IQueryHandler<ReadOrderQuery> {
  constructor(private readonly repository: OrderRepository) {}

  async execute(query: ReadOrderQuery) {
    console.log(clc.yellowBright('Async ReadOrderQuery...'));
    return this.repository.findByOrderId(query.orderId);
  }
}
