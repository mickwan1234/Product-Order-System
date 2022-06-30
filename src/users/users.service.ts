import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UsersService {
    @InjectRepository(User)
    private userRepository: Repository<User>;

    async findOne(username: string): Promise<User | undefined> {
        return await this.userRepository.findOneBy({username: username});
      }

      async create(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

}
