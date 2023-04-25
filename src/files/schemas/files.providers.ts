import { Connection } from 'mongoose';
import { FileSchema } from './file.schema';
import { DATABASE_CONNECTION, FILE_MODEL } from 'src/shared/constants';

export const filesProviders = [
  {
    provide: FILE_MODEL,
    useFactory: (connection: Connection) => connection.model('File', FileSchema, 'fs.files'),
    inject: [DATABASE_CONNECTION],
  },
];