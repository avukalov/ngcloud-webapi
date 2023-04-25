import { createHash, randomBytes } from 'crypto';
import { FileMetadata } from './file-metadata.model';
import path from 'path';
import { Logger } from '@nestjs/common';



export class File {

    length: number;
    chunkSize: number;
    uploadDate: Date;
    filename: string;
    contentType: string;
    metadata: FileMetadata;
    aliases?: string[];


    constructor(file?: Express.Multer.File, owner?: string) {
        if(file){
            this.mapFile(file, owner);
            this.hashFilename(file.originalname);
        }
    }

    private mapFile(file: Express.Multer.File, owner?: string): void {
        this.length = file.size;
        this.chunkSize = file.chunkSize;
        this.uploadDate = file.uploadDate || new Date();
        this.contentType = file.mimetype;
        this.metadata = new FileMetadata(file, owner);
    }

    private hashFilename(filename: string): void {
        if(!filename) {
            Logger.debug("filename is not definded", `${FileMetadata.name}.${this.hashFilename.name}`)
            return;
        }

        this.filename = createHash("md5").update(filename+new Date()).digest("hex")
    }
}