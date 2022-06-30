import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from './product.entity';

@Injectable()
export class ProductService {
    @InjectRepository(Product)
    private productRepository: Repository<Product>;

    async findAll(): Promise<Product[] | undefined> {
        return await this.productRepository.find();
      }


}
