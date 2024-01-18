 import { ItransactionHandler } from 'src/common/domain/transaction_handler/transaction_handler';
 import { QueryRunner } from 'typeorm';

 export class TransactionHandlerMock implements ItransactionHandler {
   constructor(private readonly runner: QueryRunner) {
     this.runner = runner;
   }
   async startTransaction() {
     return this.runner.startTransaction();
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
