import { Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private OrderService: OrderService) {}

    @Post("save")
    @UseGuards(AuthGuard('jwt'))
    async createNewOrder(@Query("userId") userId:string, @Request() req) {
        await this.OrderService.createOrder(userId, req);
        return "Successfully save order"
    }

}
