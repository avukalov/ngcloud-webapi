import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, GRIDFS } from 'src/shared/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => mongoose.connect('mongodb://server:27017/ngcloud'),
  },
  {
    provide: GRIDFS,
    useFactory: () => new mongoose.mongo.GridFSBucket(mongoose.connection.db),
    inject: [DATABASE_CONNECTION],
      
  },
];
