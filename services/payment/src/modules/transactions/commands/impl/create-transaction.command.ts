export class CreateTransactionCommand {
  constructor(
    public readonly txId: string,
    public readonly orderId: string,
    public readonly productId: string,
    public readonly amount: number,
    public readonly state: string,
  ) {}
}
