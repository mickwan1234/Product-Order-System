import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private ProductService: ProductService){}

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllProducts() {
        return this.ProductService.findAll();
    }
}
