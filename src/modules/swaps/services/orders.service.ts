import { Injectable } from '@nestjs/common';
import { Iorder } from '../types/Order.interface';
import { CreateOrderDto } from '../dto/createOrder.dto';

@Injectable()
export class OrdersService {
  private orders: Map<number, Iorder> = new Map([
    [
      1,
      {
        id: 1,
        creator: '1231',
        fromValue: 12,
        fromValuePair: 'regnet',
        toValue: 12,
        toValuePair: 'testnet',
      },
    ],
    [
      2,
      {
        id: 2,
        creator: '1231',
        fromValue: 12,
        fromValuePair: 'regnet',
        toValue: 12,
        toValuePair: 'testnet',
      },
    ],
  ]);

  createOrder(orderDto: CreateOrderDto, creator: string) {
    const order = { id: +new Date(), creator, ...orderDto };
    this.orders.set(order.id, order);

    return order;
  }
  getOrders() {
    return Array.from(this.orders.values());
  }
}
