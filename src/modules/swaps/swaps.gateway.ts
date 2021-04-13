import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateOrderDto } from './dto/createOrder.dto';
import { BadRequestTransformToWsExeptionAndHandle } from '../../exeptionFilters/BadRequestTransformToWsExeptionAndHandle.filter';
import { HandleWsExeption } from '../../exeptionFilters/HandleWsExeption.filter';
import { OrdersService } from './services/orders.service';
import { FormatResultWs } from 'src/decorators/FormatResultWs';

//this for handle errors after failed validate dto
@UseFilters(
  new BadRequestTransformToWsExeptionAndHandle(),
  new HandleWsExeption(),
)
@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class SwapsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private orderService: OrdersService) {}

  @SubscribeMessage('acceptOrder')
  @FormatResultWs()
  acceptOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() orderId: string,
  ) {
    console.log(orderId);
    this.server.emit('deleteOrder', orderId);
  }
  @SubscribeMessage('newOrder')
  @FormatResultWs()
  newOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createOrderDto: CreateOrderDto,
  ) {
    const order = this.orderService.createOrder(createOrderDto, socket.id);
    this.server.emit('newOrder', order);
  }

  handleConnection(socket: Socket) {
    console.log('connect', socket.id);
    socket.emit('openOrders', this.orderService.getOrders());
  }
  handleDisconnect(socket: Socket) {
    console.log('disconnect', socket.id);
  }
}
