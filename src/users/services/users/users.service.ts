import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersReopository: Repository<User>,
  ) {}
  getAll(): Promise<User[]> {
    return this.usersReopository.find({
      relations: ['pets']
    }); // select * from user join pet
  }
  async getOneById(id: number): Promise<User> {
    try {
      const user = this.usersReopository.findOneBy({ id });
      return user;
    } catch (error) {
      throw error;
    }
  }
  createUser(name: string): Promise<User> {
    const newUser = this.usersReopository.create({firstName: name});
    return this.usersReopository.save(newUser); //insert user
  }
  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);
    user.firstName = name;
    return this.usersReopository.save(user);
  }
  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id)
    return this.usersReopository.remove(user)
  }
}
