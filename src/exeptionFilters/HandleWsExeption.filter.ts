import { Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { WsStatus } from 'src/modules/swaps/types/WsStatus.enum';

@Catch(WsException)
export class HandleWsExeption extends BaseWsExceptionFilter {
  catch(exception: any, host: any) {
    if (
      exception.message &&
      host.args[2] &&
      typeof host.args[2] === 'function'
    ) {
      host.args[2]({
        status: WsStatus.error,
        message:
          (exception.error && exception.error.message) ||
          exception.message ||
          'bad emit',
      });
    }

    super.catch(exception, host);
  }
}
