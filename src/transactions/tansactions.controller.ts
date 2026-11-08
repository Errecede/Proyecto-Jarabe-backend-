import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('transfer')
  async transfer(
    @Req() req: any, 
    @Body() createTransactionsDto: CreateTransactionsDto,
  ) {
    const senderId = req.user.id;
    return this.transactionsService.transfer(senderId, createTransactionsDto);
  }




  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getHistoryUser(@Req() req: any){
    const userId = req.user.id;
    return this.transactionsService.getHistoryUser(userId);
  }



}