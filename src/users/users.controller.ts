import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 @UseGuards(AuthGuard('jwt'))
 @Get('balance')
  async getBalance(@Req() req:any){
    const userId = req.user.id;
    return this.usersService.getBalance(userId);
 }
}