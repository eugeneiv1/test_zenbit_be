import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as process from 'process';

@Injectable()
export class MysqlService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(this.configService.get('DB_PASSWORD'));
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [
        path.join(process.cwd(), 'dist', 'src', 'entities', '*.entity.js'),
      ],
      migrations: [
        path.join(process.cwd(), 'dist', 'src', 'migrations', '*.js'),
      ],
      synchronize: false,
    };
  }
}
