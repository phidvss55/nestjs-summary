import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderRequest) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }
}
