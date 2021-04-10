import { Injectable } from "@nestjs/common";
import { Order } from "../interface/Order.interface";
import { CreateOrderDto } from '../dto/createOrder.dto'


@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  createOrder(order: CreateOrderDto) {
    this.orders.push(order);
  }
  getOrders() {
    return this.orders;
  }
}