import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import Product from 'src/product/product.entity';
import { Repository } from 'typeorm';
import Order from './order.entity';

@Injectable()
export class OrderService {
    @InjectRepository(Order)
    private orderRepository: Repository<Order>;
    @InjectRepository(Product)
    private productRepository: Repository<Product>;

    constructor(private cartService: CartService){}

    async createOrder(userId: string, req) {
        const cart = await this.cartService.getCartInfo(userId);
        const cartJson = JSON.stringify(cart.cartItems)
        const paymentMethod = req.body.paymentMethod;

        for (let index = 0; index < cart.cartItems.length; index++) {
            const cartItem = cart.cartItems[index];
            const item = await this.productRepository.findOneBy({
                id: cartItem.productId
            })

            item.quantity = item.quantity - cartItem.quantity;
            if(item.quantity < 0){
                throw new BadRequestException('Can\'t create order with quantity greater than inventory')
            }
            this.productRepository.save(item);

        }
        
        const order = new Order(userId, cartJson,cart.totalPrice,paymentMethod);

        return await this.orderRepository.save(order);
    }

}
