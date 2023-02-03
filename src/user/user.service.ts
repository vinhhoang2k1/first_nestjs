import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from 'src/auth/models/user.dto';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findUserByEmail(@User() email: string): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async updateUser(email: string, data: UpdateUserDTO): Promise<UserEntity> {
    await this.userRepo.update({ email }, data);
    return this.findUserByEmail(email);
  }

  async followUser(
    currentUser: UserEntity,
    email: string,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['followers'],
    });
    user.followers.push(currentUser);
    await user.save();
    return user.toProfile(currentUser);
  }

  async unFollowUser(currentUser: UserEntity,email: string) {
    const user = await this.userRepo.findOne({
      where: {email},
      relations: ['followers']
    })
    user.followers = user.followers.filter(follwer => follwer !== currentUser)
    await user.save();
    return user.toProfile(currentUser);
  }
}
