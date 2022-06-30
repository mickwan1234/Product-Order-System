import { CacheModule, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from 'src/product/product.entity';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [CacheModule.register(),TypeOrmModule.forFeature([Product]) ]
})
export class CartModule {}
