import { ItransactionHandler } from '../domain/transaction_handler/transaction_handler';
import { QueryRunner } from 'typeorm';

export class TransactionHandlerImplementation implements ItransactionHandler{

  private readonly _runner: QueryRunner;
  constructor(private readonly runner: QueryRunner) {
    this.runner = runner;

  }
  async startTransaction() {
    return await this.runner.startTransaction();
  }
  async commitTransaction() {
    return await this.runner.commitTransaction();
  }
  async rollbackTransaction() {
    return await this.runner.rollbackTransaction();
  }

  getRunner(): QueryRunner {
    return this.runner;
  }
}
