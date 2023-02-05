import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import {
  CreateArticleDTO,
  FindAllQuery,
  FindFeedQuery,
  UpdateArticleDTO,
} from './models/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findAll(user: UserEntity, query: FindAllQuery) {
    let findOptions: any = {
      where: {},
    };
    if (query.author) {
      findOptions.where['author.username'] = query.author;
    }
    if (query.favorited) {
      findOptions.where['favoritedBy.username'] = query.favorited;
    }
    if (query.tag) {
      findOptions.where.tagList = Like(`%${query.tag}%`);
    }
    if (query.offset) {
      findOptions.offset = query.offset;
    }
    if (query.limit) {
      findOptions.limit = query.limit;
    }
    return (await this.articleRepo.find(findOptions)).map((article) =>
      article.toArticle(user),
    );
  }

  async findFeed(user: UserEntity, query: FindFeedQuery) {
    const { followee } = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ['followee'],
    });
    const findOptions: any = {
      ...query,
      where: followee.map((follow) => ({ author: follow.id })),
    };
    return (await this.articleRepo.find(findOptions)).map((article) =>
      article.toArticle(user),
    );
  }

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

  async favoriteArticle(user: UserEntity, slug: string) {
    const article = await this.findBySlug(slug);
    article.favoriteBy.push(user);
    await article.save();
    return (await this.findBySlug(slug)).toArticle(user);
  }

  async unFavoriteArticle(user: UserEntity, slug: string) {
    const article = await this.findBySlug(slug);
    article.favoriteBy = article.favoriteBy.filter(
      (favBy) => favBy.id !== user.id,
    );
    await article.save();
    return (await this.findBySlug(slug)).toArticle(user);
  }
}
