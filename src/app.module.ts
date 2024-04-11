import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './foods/food.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRESS_SSL === 'true',
      extra: {
        ssl: process.env.POSTGRESS_SSL === 'true'
          ? {
            rejectUnauthorized: true,
          }
          : null,
      },
    }),
    FoodModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
