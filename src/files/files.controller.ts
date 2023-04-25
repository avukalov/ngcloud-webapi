import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Logger, UploadedFiles, UseGuards, Req, Inject } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { AuthGuard } from '@nestjs/passport';
import * as mongoose from 'mongoose'
import { FILE_MODEL, GRIDFS } from 'src/shared/constants';
import { File } from './models/file.model';
import { Readable } from 'stream'


@Controller('api/files')
export class FilesController {
  constructor(
    @Inject(GRIDFS) private gridFSBucket: mongoose.mongo.GridFSBucket,
    @Inject(FILE_MODEL) private fileModel: mongoose.Model<File>,
    private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files'))
  upload(
    @Req() req: any,
    @UploadedFiles() files: Array<Express.Multer.File>, 
  ) {
    
    const { sub } = req.user;

    files.forEach(file => {
      
      var newFile = new File(file, sub);
    
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      let uploadStream = this.gridFSBucket.openUploadStream(newFile.filename, { ...newFile });
      readableStream.pipe(uploadStream);
      
      uploadStream.on('error', (error) => Logger.error(error));
      uploadStream.on('finish', () => {
        Logger.debug('Uploade finished!')
        return;
      });

    });
  }

  @Get('download/:id')
  downloadFile(@Param('id') id: string) {
    Logger.debug(`This should download file with id: ${id} from server`);
  }

  @Get()
  findAll() {
    return this.fileModel.find().exec();
    // return this.filesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Req() req: any) {

    // var file = new File().toModel();
    const result = await this.fileModel.findById(id).exec();
    

    Logger.debug("result: ", result);
    
    return result;
    

    return id;

    // return this.filesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
