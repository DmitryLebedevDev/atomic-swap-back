import { BadRequestException, Catch } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { HandleWsExeption } from './HandleWsExeption.filter';

//for handle errors after failed validate dto in webSocket
@Catch(BadRequestException)
export class BadRequestTransformToWsExeptionAndHandle extends HandleWsExeption {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: BadRequestException, host: any): void {
    const errorInfo: any = exception.getResponse();
    errorInfo.error = 'Bad data';
    delete errorInfo.statusCode;

    if (host.args[1] && host.args[1].emited) {
      errorInfo.emited = host.args[1].emited;
    }

    const properError = new WsException(errorInfo);
    super.catch(properError, host);
  }
}
