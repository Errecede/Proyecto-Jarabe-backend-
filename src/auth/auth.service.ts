import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    //  ---- CREAR UN USUARIO NUEVO ------
    async create(createUserDto: CreateUserDto){
        try {
            const {password, ...userData} = createUserDto;
            const user = this.userRepository.create({
                ...userData, 
                password: bcrypt.hashSync(password, 10),
            }) 

            await this.userRepository.save(user);
            delete user.password;
            return user;    
        } 
        catch (error) {
            this.handleDBExceptions(error);
        }
    }

    //  -------- LOGEEAR UN USUARIO -------
    async login(loginUserDto: LoginUserDto){
        const {email, password} = loginUserDto;
        const user = await this.userRepository.findOne({
            where: {email},
            select: {
                password: true,
                email: true,
                id: true,
                name: true,
            }
        })

        if(!user){
            throw new UnauthorizedException('Credentials are not valid');
        }
        if(!bcrypt.compareSync(password, user.password!)){
            throw new UnauthorizedException('Credentials are not valid');
        }

        // Actualizamos el último login con la fecha actual
        user.lastLogin = new Date();
        await this.userRepository.save(user);

        delete user.password;
        return {
            user,
            token: this.getJwtToken({id: user.id}),
        }; 
    }

    //  ---------  Obtener Jwt -------
    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }

    // Metodo para manejar errores de correo duplicado. 
    private handleDBExceptions(error: any): never {
        if(error.code === '23505'){
            throw new BadRequestException('El correo ya se encuentra registrado');
        }

        console.log(error);
        throw new InternalServerErrorException('Please check server logs');
    }
}