import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
    Logger,
  } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';
  
  
  @Injectable()
  export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
  {
    private readonly logger = new Logger(PrismaService.name);
    async onModuleInit() {
      let retries = 5;
      while (retries > 0) {
        try {
          await this.$connect();
  
          this.logger.log('Successfully connected to xcidic database');
  
          break;
        } catch (err) {
          this.logger.error(err);
  
          this.logger.error(
            `there was an error connecting to database, retrying .... (${retries})`,
          );
  
          retries -= 1;
  
          await new Promise((res) => setTimeout(res, 3_000)); // wait for three seconds
        }
      }
    }
  
    async onModuleDestroy() {
      await this.$disconnect();
    }
  }
  