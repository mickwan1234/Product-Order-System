import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { Repository } from 'typeorm';
import Order from './order.entity';

@Injectable()
export class OrderService {
    @InjectRepository(Order)
    private orderRepository: Repository<Order>;

    constructor(private cartService: CartService){}

    async createOrder(userId: string, req) {
        const cart = await this.cartService.getCartInfo(userId);
        const cartJson = JSON.stringify(cart.cartItems)
        const paymentMethod = req.body.paymentMethod;
        
        const order = new Order(userId, cartJson,cart.totalPrice,paymentMethod);

        return await this.orderRepository.save(order);
    }

}
