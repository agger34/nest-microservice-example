import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { CreateTransactionDto } from '../interfaces/create-transaction-dto.interface';

@Injectable()
export class TransactionRepository {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async updateByTxId(transactionDto): Promise<Transaction> {
    return this.transactionModel.updateOne({ txId: transactionDto.txId}, transactionDto);
  }
}
