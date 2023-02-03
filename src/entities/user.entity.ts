import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { ArticleEntity } from './article.entity';

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

  @ManyToMany(type => ArticleEntity, article => article.favoriteBy)
  @JoinColumn()
  favorites: ArticleEntity[]

  @ManyToMany(() => UserEntity, user => user.followee)
  @JoinTable()
  followers: UserEntity[]

  @ManyToMany(() =>  UserEntity, user => user.followers)
  followee: UserEntity[]

  @OneToMany(type => ArticleEntity, article => article.author)
  articles: ArticleEntity[]
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

  toProfile(user: UserEntity) {
    let follwing = null
    if(user) {
      follwing = this.followers.includes(user)
    }
    const profile:any = this.toJSON() 
    delete profile.followers
    return {...profile, follwing}
  }
}
