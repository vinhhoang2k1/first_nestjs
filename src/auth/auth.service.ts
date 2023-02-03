import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import {JwtService} from "@nestjs/jwt"
import { LoginDTO, RegisterDTO } from 'src/auth/models/user.dto';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
 constructor(@InjectRepository(UserEntity)
  private userRepo: Repository<UserEntity>,
  private jwrService: JwtService
  ) {

 }
  
  async register(credentials: RegisterDTO) {
    try {
      const newUser = this.userRepo.create(credentials)
      await newUser.save()
      const payload = {username: newUser.email}
      const token = this.jwrService.sign(payload)

      return {user: {
        ...newUser.toJSON(),
        token
      }}
    } catch (error) {
      if(error.code === '23505') {
        throw new ConflictException('User has already taken')
      }
        throw new InternalServerErrorException()
    }
  }

  async login({email, password}: LoginDTO) {
    try {
      const user = await this.userRepo.findOne({where: {email}})
      const payload = { username: user.email} 
      const token = this.jwrService.sign(payload)
      if(user && await user.comparePassword(password)) {
        return {
          user: {
            ...user.toJSON(),
            token
          }
        }
      }
      throw new UnauthorizedException("Invalid credentials")
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
