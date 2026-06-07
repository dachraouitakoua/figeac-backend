import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PpmReportsModule } from './ppm-reports/ppm-reports.module';
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8']);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        'mongodb+srv://dachraouitakoua_db_user:mj2jePu4DQ2cmVI8@cluster0.a46xhb3.mongodb.net/',
    ),
    UsersModule,
    AuthModule,
    ProductsModule,
    PpmReportsModule,
  ],
})
export class AppModule {}
