import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateOrderDto } from './dto/createOrder.dto';
import { BadRequestTransformToWsExeptionAndHandle } from '../../exeptionFilters/BadRequestTransformToWsExeptionAndHandle.filter';
import { HandleWsExeption } from '../../exeptionFilters/HandleWsExeption.filter';
import { OrdersService } from './services/Orders.service';
import { FormatResultWs } from 'src/decorators/FormatResultWs';
import { ActiveOrdersService } from './services/ActiveOrders.service';

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
  constructor(
    private orderService: OrdersService,
    private activeOrdersService: ActiveOrdersService,
  ) {}
  @SubscribeMessage('endActiveOrder')
  @FormatResultWs()
  endActiveOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { id }: { id: number },
  ) {
    const { creator } = this.activeOrdersService.getById(id);
    if (creator === socket.id) {
      this.activeOrdersService.deleteById(id);
    }
  }

  @SubscribeMessage('sendFromPairHTLC')
  @FormatResultWs()
  sendFromPairHTLC(@MessageBody() message: { id: number; txid: string }) {
    const { id } = message;
    const activeOrder = this.activeOrdersService.getById(id);
    this.server.sockets.connected[activeOrder.acceptor].emit(
      'sendFromPairHTLC',
      message,
    );
  }
  @SubscribeMessage('sendToPairHTLC')
  @FormatResultWs()
  sendToPairHTLC(
    @MessageBody() message: { id: number; txid: string; secretNumHash: string },
  ) {
    const { id } = message;
    const activeOrder = this.activeOrdersService.getById(id);
    this.server.sockets.connected[activeOrder.creator].emit(
      'sendToPairPubKey',
      message,
    );
  }

  @SubscribeMessage('sendToPairPubKey')
  @FormatResultWs()
  sendToPairPubKey(@MessageBody() message: { id: number; hexPubKey: string }) {
    console.log(message, 'sendToPairPubKey');
    const { id } = message;
    const activeOrder = this.activeOrdersService.getById(id);
    this.server.sockets.connected[activeOrder.creator].emit(
      'sendToPairPubKey',
      message,
    );
  }
  @SubscribeMessage('sendFromPairPubKey')
  @FormatResultWs()
  sendFromPairPubKey(
    @MessageBody() message: { id: number; hexPubKey: string },
  ) {
    console.log(message, 'sendFromPairPubKey');
    const { id } = message;
    const activeOrder = this.activeOrdersService.getById(id);
    this.server.sockets.connected[activeOrder.acceptor].emit(
      'sendFromPairPubKey',
      message,
    );
  }

  @SubscribeMessage('acceptOrder')
  @FormatResultWs()
  acceptOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() orderId: number,
  ) {
    const order = this.orderService.getOrderById(orderId);
    if (order && this.server.sockets.connected[order.creator]) {
      this.server.sockets.connected[order.creator].emit('acceptOrder', orderId);
      this.server.emit('deleteOrder', orderId);
      this.orderService.deleteOrder(orderId);
      this.activeOrdersService.createActiveOrder(
        order.id,
        order.creator,
        socket.id,
      );
    }
  }
  @SubscribeMessage('newOrder')
  @FormatResultWs()
  newOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createOrderDto: CreateOrderDto,
  ) {
    const order = this.orderService.createOrder(createOrderDto, socket.id);
    socket.broadcast.emit('newOrder', order);
    return order.id;
  }

  handleConnection(socket: Socket) {
    socket.emit('openOrders', this.orderService.getOrders());
  }
  handleDisconnect(socket: Socket) {
    console.log('disconnect', socket.id);
  }
}
