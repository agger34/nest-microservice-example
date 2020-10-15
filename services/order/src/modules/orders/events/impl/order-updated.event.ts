export class OrderUpdatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly state: string
  ) {}
}
