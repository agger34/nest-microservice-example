import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QueueConst } from '../shared/constants/queue.const';
@Injectable()
export class PaymentClientService {
  constructor(
    @Inject(QueueConst.PAYMENT_QUEUE) private readonly client: ClientProxy,
  ) {}
  public sendSubscribe(pattern: string, data: any) {
    return this.client.send(pattern, data).subscribe();
  }
  public sendPromise(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
  public publish(pattern: string, data: any) {
    this.client.emit(pattern, data);
  }
}
