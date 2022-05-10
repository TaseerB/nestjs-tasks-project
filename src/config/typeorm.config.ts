import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const path = require('path');

// let val = path.resolve('./../**/*.entity{.ts,.js}');

// console.info({ val });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
// entities: ['./../**/*.entity{.ts,.js}'],
