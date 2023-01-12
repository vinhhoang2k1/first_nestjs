import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
 constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {

 }
  
  async register(credentials: RegisterDTO) {
    try {
      const newUser = this.userRepo.create(credentials)
      await newUser.save()
      return newUser
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
      if(user && await user.comparePassword(password)) {
        return user
      }
      throw new UnauthorizedException("Invalid credentials")
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
