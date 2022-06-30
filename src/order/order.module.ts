import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import Product from 'src/product/product.entity';
import { OrderController } from './order.controller';
import Order from './order.entity';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, CartService],
  imports: [TypeOrmModule.forFeature([Order]),CacheModule.register(), TypeOrmModule.forFeature([Product])],
})
export class OrderModule {}
