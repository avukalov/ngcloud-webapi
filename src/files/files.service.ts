import { Injectable, Logger } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileMetadata } from './models/file-metadata.model';
import { PrivacyStatus } from './models/privacy-status.enum';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  static uploadMulter(req: any, file: any) {
    return new Promise((resolve, reject) => {
      
      // Logger.debug(file);
      // Logger.debug(req.file);
      // Logger.debug(req.files);

      // const metadata: FileMetadata = {
      //   owner: req.user.sub,
      //   ownersGroup: [req.user.sub],
      //   privacyStatus: PrivacyStatus.PRIVATE, // Fill from request
      //   shareLink: null
      // };

      resolve({ 
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        contentType: file.mimetype,
        
      });
    });
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }

}
