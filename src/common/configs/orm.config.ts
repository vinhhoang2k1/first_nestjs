import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  logging: ['error', 'warn'],
//   migrationsRun: true,
//   migrations: ['dist/migrations/*.{js,ts}'],
});

export default dataSource;
