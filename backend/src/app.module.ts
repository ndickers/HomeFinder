import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AuthorizationMiddleware } from './auth/middleware/authorization.middleware';
import { UsersController } from './users/users.controller';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [UsersModule, AuthModule, MailModule, PropertiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).exclude(
      { path: 'users/registration-set-password', method: RequestMethod.POST },
    ).forRoutes(UsersController)
  }
}
