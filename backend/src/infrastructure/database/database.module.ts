import { Module } from '@nestjs/common';
import { databaseConnectionProviders } from '../providers/database.connection.providers';

@Module({
  providers: [...databaseConnectionProviders],
  exports:[...databaseConnectionProviders],
})
export class DatabaseModule {}
