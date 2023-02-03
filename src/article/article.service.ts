import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleDTO, UpdateArticleDTO } from './models/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  findBySlug(slug: string) {
    return this.articleRepo.findOne({
      where: { slug },
    });
  }

  private ensureOwnerShip(user: UserEntity, article: ArticleEntity): boolean {
    return article.author.id === user.id;
  }

  async createAricle(user: UserEntity, data: CreateArticleDTO) {
    const newArticle = this.articleRepo.create(data);
    newArticle.author = user;
    const { slug } = await newArticle.save();
    return (await this.articleRepo.findOne({ where: { slug } })).toArticle(
      user,
    );
  }

  async updateArticle(slug: string, user: UserEntity, data: UpdateArticleDTO) {
    const article = await this.findBySlug(slug);
    if (!this.ensureOwnerShip(user, article)) {
      throw new UnauthorizedException();
    }
    await this.articleRepo.update({ slug }, data);
    return article.toArticle(user);
  }

  async deleteArticle(slug: string, user: UserEntity) {
    const article = await this.findBySlug(slug);
    if (!this.ensureOwnerShip(user, article)) {
      throw new UnauthorizedException();
    }
    await this.articleRepo.remove(article);
  }
}
