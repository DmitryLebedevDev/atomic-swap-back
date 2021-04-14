import { Injectable } from '@nestjs/common';
import { Iorder } from '../types/Order.interface';
import { CreateOrderDto } from '../dto/createOrder.dto';

@Injectable()
export class OrdersService {
  private orders: Map<number, Iorder> = new Map();

  createOrder(orderDto: CreateOrderDto, creator: string) {
    const order = { id: +new Date(), creator, ...orderDto };
    this.orders.set(order.id, order);

    return order;
  }
  deleteOrder(id: number) {
    return this.orders.delete(id);
  }
  isExistOrder(id: number) {
    return this.orders.has(id);
  }
  getOrderById(id: number): Iorder {
    return this.orders.get(id);
  }
  getOrders() {
    return Array.from(this.orders.values());
  }
}
