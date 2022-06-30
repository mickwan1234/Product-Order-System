import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/product/product.entity';
import { In, Repository } from 'typeorm';
import { Cart, CartItem } from './cart.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class CartService {

    @InjectRepository(Product)
    private productRepository: Repository<Product>;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}

    async setCartInfo(userId: string, cart: Cart) {
        const key = `cart-${userId}`;
        cart.username = userId;
        cart.totalPrice = await this.getTotalPrice(cart.cartItems);;
        await this.cacheManager.set(key, cart, { ttl: 0 });
    }

    async getTotalPrice(cartItems: CartItem[]): Promise<number> {
        const productIds = cartItems.map(p => p.productId);
        const productPriceMap = await this.getProductPriceMap(productIds);
        const totalPrice = cartItems.map(cartItem => cartItem.quantity * productPriceMap[cartItem.productId]).reduce((a, v) => a + v, 0);
        return totalPrice;
    }

    async getProductPriceMap(productIds: number[]): Promise<any> {
        return await this.productRepository.findBy({
            id: In(productIds),
        }).then(products => products.reduce((map, prod) => {
            map[prod.id] = prod.price
            return map;
        }, {}));
    }

    async getCartInfo(userId: string): Promise<Cart> {
        const key = `cart-${userId}`;
        let cart: Cart = await this.cacheManager.get(key);
        if (!cart) {
            cart = new Cart(userId, [], 0);
            await this.cacheManager.set(key, cart, { ttl: 0 });
        }
        return cart;
    }

    async deleteUserCart(userId: string) {
        const key = `cart-${userId}`;
        await this.cacheManager.del(key);
    }
}
