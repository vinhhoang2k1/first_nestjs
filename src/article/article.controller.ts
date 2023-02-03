import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDTO, UpdateArticleDTO } from './models/article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  @Post('')
  @UseGuards(AuthGuard())
  async createArticle(
    @User() user: UserEntity,
    @Body(ValidationPipe) article: CreateArticleDTO,
  ) {
    const newArticle = await this.articleService.createAricle(user, article);
    return { newArticle };
  }

  @Put('/:slug')
  @UseGuards(AuthGuard())
  async updateArticle(
    @User() user: UserEntity,
    @Param('slug') slug: string,
    @Body(ValidationPipe) article: UpdateArticleDTO,
  ) {
    const articleUpdate = await this.articleService.updateArticle(
      slug,
      user,
      article,
    );

    return { articleUpdate };
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard())
  async deleteArticle(@Param('slug') slug: string, @User() user: UserEntity) {
    const article = this.articleService.deleteArticle(slug, user);
    return { article };
  }
}
