import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "../../transactions/entities/transactions.entity";

@Entity('users')
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {})
    name: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {select: false})
    password?: string;

    @Column('decimal', {precision: 12, scale: 2, default: 0.00})
    balance: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @Column('timestamp', {nullable: true, name: 'last_login'})
    lastLogin: Date;



    //Relaciones 

    // ------Enviada----
    @OneToMany(() => Transaction, (transaction) => transaction.senderId)
        sentTransactions: Transaction[];

    //  -----Recibida---
    @OneToMany(() => Transaction, (transaction) => transaction.receiverId)
    receivedTransactions: Transaction[];

}