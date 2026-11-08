import { User } from './../../users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('transactions')
export class Transaction{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', {precision:12, scale: 2})
    amount: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'sender_id'})
    senderId: string;

    @Column({name: 'receiver_id'})
    receiverId: string; 




    //Relaciones
    // Transaccion para el usuario que está enviando.

    @ManyToOne(() => User, (user) => user.sentTransactions, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'sender_id'})
    sender: User; 

    // Trancsaccion con el usuario que recibe.
    @ManyToOne(() => User, (user) => user.receivedTransactions, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'receiver_id'})
    receiver: User;
}