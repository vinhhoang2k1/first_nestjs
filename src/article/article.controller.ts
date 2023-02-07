import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OptionalAuthGuard } from 'src/auth/auth-option.guard';
import { User } from 'src/auth/user.decorator';
import { ApiqueryDoc } from 'src/common/option/query';
import { UserEntity } from 'src/entities/user.entity';
import { ArticleService } from './article.service';
import {
  CreateArticleDTO,
  FindAllQuery,
  FindFeedQuery,
  UpdateArticleDTO,
} from './models/article.dto';
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('')
  @UseGuards(new OptionalAuthGuard())
  async getAll(@User() user: UserEntity, @Query() query: FindAllQuery) {
    const articles = await this.articleService.findAll(user, query);
    return {
      articles,
      articlesCount: articles.length,
    };
  }

  @Get('/feed')
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard())
  @ApiQuery(ApiqueryDoc.limit)
  @ApiQuery(ApiqueryDoc.offset)
  async getFeed(@User() user: UserEntity, @Query() query: FindFeedQuery) {
    const articles = await this.articleService.findFeed(user, query);
    return {
      articles,
      articlesCount: articles.length,
    };
  }

  @Get('/:slug')
  @UseGuards(new OptionalAuthGuard())
  findBySlug(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  @Post('')
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard())
  @ApiBody({ type: CreateArticleDTO })
  async createArticle(
    @User() user: UserEntity,
    @Body(ValidationPipe) article: CreateArticleDTO,
  ) {
    const newArticle = await this.articleService.createAricle(user, article);
    return { newArticle };
  }

  @Put('/:slug')
  @ApiBearerAuth('token')
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
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard())
  async deleteArticle(@Param('slug') slug: string, @User() user: UserEntity) {
    const article = this.articleService.deleteArticle(slug, user);
    return { article };
  }

  @Post('/:slug/favorite')
  async favoriteArticle(user: UserEntity, @Param('slug') slug: string) {}

  @Delete('/:slug/favorite')
  async unFavoriteArticle(user: UserEntity, @Param('slug') slug: string) {}
}
