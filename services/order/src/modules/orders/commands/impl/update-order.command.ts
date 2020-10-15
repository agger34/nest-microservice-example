export class UpdateOrderCommand {
  constructor(
    public readonly orderId: string,
    public readonly state: string
  ) {}
}
