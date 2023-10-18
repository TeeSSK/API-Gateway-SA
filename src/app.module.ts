import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import googleOauthConfig from './config/google-oauth.config';
import jwtSecret from './config/jwt.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { SubjectModule } from './subjects/subjects.module';
import { FileModule } from './files/files.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SubjectModule,
    FileModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      load: [googleOauthConfig, jwtSecret],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
