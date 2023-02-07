import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/shared/database.module';
import { UploadModule } from './uploads/upload.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './files'
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ArticleModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
