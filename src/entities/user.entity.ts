import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({unique: true})
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
