import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly dataSource: DataSource,
    ){}

    //para transferir
    async transfer(senderId: string, CreateTransactionsDto: CreateTransactionsDto){
        const {receiverEmail, amount} = CreateTransactionsDto;


        const sender = await this.userRepository.findOneBy({id: senderId});
        if(!sender){
            throw new NotFoundException('Usuario no encontrado');
        }

        const receiver = await this.userRepository.findOneBy({email: receiverEmail})
        if(!receiver){
            throw new NotFoundException('no hay')
        }


        if (sender.id === receiver.id) {
            throw new BadRequestException ('No puede realizar una transaccion a si mismo.')
        }

        if(sender.balance < amount){
            throw new BadRequestException('No tiene suficiente dinero para enviar esa cantidad.')
        }





        const currentBalance = Number(sender.balance);
        const transferAmount = Number(amount);

        sender.balance = currentBalance - transferAmount;
        receiver.balance = Number(receiver.balance) + transferAmount;


        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(sender);
            await queryRunner.manager.save(receiver);

            const transaction = queryRunner.manager.create(Transaction, {
                sender,
                receiver,
                amount,
            });

            await queryRunner.manager.save(transaction);

            await queryRunner.commitTransaction();
            await queryRunner.release();
            return transaction;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            console.error('Esto pa ver el error real de la transaccion', error);

            throw new BadRequestException('Error al procesar la transferencia');
        }

    }

    //para ver historial de movimientos
    async getHistoryUser(userId: string){
    return this.transactionRepository.find({
      where: [
        {sender: {id: userId}},
        {receiver: {id: userId}},
      ],

      relations: {
        sender: true,
        receiver: true,
      },
      order: {createdAt: 'DESC'}
    });
  }

}
