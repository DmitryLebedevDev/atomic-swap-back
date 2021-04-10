export interface Order {
  fromAddress: string

  fromValue: number
  fromValuePair: 'testnet' | 'regnet'

  toValue: number
  toValuePair: 'testnet' | 'regnet'
}