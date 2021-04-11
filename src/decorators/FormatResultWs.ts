import { WsStatus } from 'src/modules/swaps/types/WsStatus.enum';

export const FormatResultWs = (): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    return result
      ? { status: WsStatus.success, data: result }
      : { status: WsStatus.success };
  };

  return descriptor;
};
