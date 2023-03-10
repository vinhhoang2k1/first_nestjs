import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import dataSource from "../configs/orm.config";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await dataSource.initialize();
        return addTransactionalDataSource(dataSource);
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
