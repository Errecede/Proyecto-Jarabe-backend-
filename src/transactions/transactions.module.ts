import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { TransactionsController } from './tansactions.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Transaction])
  ],
  controllers: [
    TransactionsController
  ],
  providers: [TransactionsService],
})
export class TransactionsModule {}
