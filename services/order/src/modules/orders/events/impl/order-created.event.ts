export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly productId: string,
    public readonly amount: number,
    public readonly state: string,
  ) {}
}
