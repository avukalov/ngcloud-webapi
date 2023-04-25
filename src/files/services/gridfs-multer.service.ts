import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { MONGO_URI } from 'src/shared/constants';
import { FilesService } from '../files.service';

@Injectable()
export class GridFSMulterService implements MulterOptionsFactory {
    gridFsStorage;
    constructor(private configService: ConfigService){
        this.gridFsStorage = new GridFsStorage({
            url: this.configService.get<string>(MONGO_URI),
            file: FilesService.uploadMulter
        })
    }

    createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions> {
        return { storage: this.gridFsStorage }
    }
}
