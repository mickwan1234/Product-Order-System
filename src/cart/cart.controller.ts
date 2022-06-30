import { Body, Controller, Delete, ForbiddenException, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/user.entity';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    @Roles(Role.USER)
    @UseGuards(AuthGuard('jwt'))
    async getCartInfo(@Query('userId') userId: string, @Request() req) {
        
        if (userId !== req.user.username) {
            throw new ForbiddenException('You can not view someone else cart.');
        }
        return await this.cartService.getCartInfo(userId);
    }

    @Post()
    @Roles(Role.USER)
    @UseGuards(AuthGuard('jwt'))
    async setCartInfo(@Query('userId') userId: string, @Body() cart: Cart, @Request() req) {
        if (req.user.username !== userId) {
            throw new ForbiddenException('You can not modify other people\'s cart!');
        }
        await this.cartService.setCartInfo(userId, cart);
        return "Saved cart successfully."
    }

    @Delete()
    @Roles(Role.USER)
    @UseGuards(AuthGuard('jwt'))
    async deleteCart(@Query('userId') userId: string, @Request() req) {
        
        if (userId !== req.user.username) {
            throw new ForbiddenException('You can not delete someone else cart.');
        }
        await this.cartService.deleteUserCart(userId);

        return "Delete cart successfully.";
    }

}
