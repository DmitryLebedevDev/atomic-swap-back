export interface Iorder {
  id: number;

  fromValue: number;
  fromValuePair: 'testnet' | 'regnet';

  toValue: number;
  toValuePair: 'testnet' | 'regnet';
}
