export interface Iorder {
  id: number;
  creator: string;
  acceptor?: string;

  fromValue: number;
  fromValuePair: 'testnet' | 'regnet';

  toValue: number;
  toValuePair: 'testnet' | 'regnet';
}
