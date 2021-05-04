import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwapsModule } from './modules/swaps/swaps.module';
import {BlockchainModule} from "./modules/blockchain/blockchain.module";

const nodeEnvMode = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${nodeEnvMode}`,
      isGlobal: true,
    }),
    SwapsModule,
    BlockchainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}