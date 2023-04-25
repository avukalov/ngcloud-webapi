import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { filesProviders } from './schemas/files.providers';
import { DatabaseModule } from 'src/database/database.module';
import { GridFSMulterService } from './services/gridfs-multer.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://server:27017/nestjs'),
    DatabaseModule,
    // MulterModule.registerAsync({
    //   useClass: GridFSMulterService,
    // }),
  ],
  controllers: [FilesController],
  providers: [
    FilesService,
    // GridFSMulterService,
    ...filesProviders,
  ],
  exports: [FilesService]
})
export class FilesModule {}
