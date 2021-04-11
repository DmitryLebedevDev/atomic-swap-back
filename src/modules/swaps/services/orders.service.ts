import { Injectable } from '@nestjs/common';
import { Iorder } from '../types/Order.interface';
import { CreateOrderDto } from '../dto/createOrder.dto';

@Injectable()
export class OrdersService {
  private orders: Iorder[] = [];

  createOrder(orderDto: CreateOrderDto) {
    const order = { id: +new Date(), ...orderDto };
    this.orders.push(order);

    return order;
  }
  getOrders() {
    return this.orders;
  }
}
