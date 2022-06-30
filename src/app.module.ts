import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import * as redisStore from 'cache-manager-redis-store'

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number()
    })
  }),
    DatabaseModule,
    UsersModule,
    ProductModule,
    CartModule,
    CacheModule.register({
      store:redisStore,
      host: 'localhost',
      port: 6379
    }),
    OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
