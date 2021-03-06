import { Injectable } from '@nestjs/common';
import { IactiveOrder } from '../types/ActiveOrder.interface';

@Injectable()
export class ActiveOrdersService {
  private activeOrders: Map<number, IactiveOrder> = new Map();
  deleteById(id: number) {
    return this.activeOrders.delete(id);
  }
  getById(id: number) {
    return this.activeOrders.get(id);
  }
  createActiveOrder(id: number, creator: string, acceptor: string) {
    this.activeOrders.set(id, { id, creator, acceptor });
  }
  deleteActiveOrder(id: number) {
    this.activeOrders.delete(id);
  }
}
