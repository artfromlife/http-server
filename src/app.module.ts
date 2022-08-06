import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';
import { TokenService } from './token/token.service';
const logDirectory = path.join(__dirname, '../logs');

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '124.222.219.89',
      port: 3306,
      username: 'nest',
      password: 'nest',
      database: 'ks_nest_auth',
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    WinstonModule.forRoot({
      // options (same as WinstonModule.forRoot() options)
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} | ${level} |  | ${message} `),
      ),
      transports: [
        new winston.transports.Console({
          format: nestWinstonModuleUtilities.format.nestLike()
        }),
        new winston.transports.DailyRotateFile({
          level: 'info',
          dirname: logDirectory,
          auditFile: path.join(logDirectory, 'access.audit.json'),
          filename: 'access.%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new winston.transports.DailyRotateFile({
          level: 'error',
          dirname: logDirectory,
          auditFile: path.join(logDirectory, 'error.audit.json'),
          filename: 'error.%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService , TokenService],
})
export class AppModule {
}
