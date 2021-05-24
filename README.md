## Installation

1. insert folder `./wallets`(there are private keys for 2 addresses used further) to `~/.bitcoin/regtest`  
2. copy `.env.example` to `.env.development` filling in the fields in accordance with your bitcoin core settings  
3. 3.1 insert in one browser localstorage `regnetWif|cVicbEfyrFAHPsiAXJXHaERhCStZe2PQieTCdQr6qvhhPdZYLNSF`  
3.2 insert in two browser localstorage `regnetWif|cVNwrHT27WaKXhA9TqGbPtDPsTtK2VP2kE9z2dzF1NNfaNsxm6PA`
4. 4.1 generate balance for one browser  
```bash
bitcoin-cli -regtest generatetoaddress 101 mzqv4ZydSdtKw1QtpGEcR148GgJrYr959o
```
4. 4.2 generate balance for two browser
```bash
bitcoin-cli -regtest generatetoaddress 101 mwNwv5juUiwknnDi4aLcQX7VVTPehaL6sg
```

```bash
# install dependents
$ npm install
```

## Running the app

```bash
$ bitcoind -regtest -daemon
# main wallet imported in 1 step installation
$ bitcoin-cli -regtest loadwallet main

$ npm run start:dev
```


## License

Nest is [MIT licensed](LICENSE).
