import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return{
            id: user.id,
            fullName: user.name,
            email: user.email,
            createdAt: user.createdAt,
        }
    } catch (error) {
        this.handleDBExceptions(error);
    }
  }

  async getBalance(id: string){
    const user = await this.userRepository.findOne({
      where: {id}
    });
    if (!user) {
        throw new NotFoundException('Usuario no encontrado');
    }
    return{
      email: user.email,
      name: user.name,
      balance: user.balance,
    };
  }


  private handleDBExceptions(error: any): never {
    // para correo duplicado.
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    
    console.log(error);
    throw new InternalServerErrorException('Error inesperado, revisa los logs del servidor');
  }


}