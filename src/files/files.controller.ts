import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Logger, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('api/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadBatch(@UploadedFiles() files: Array<Express.Multer.File>) {
    Logger.debug('Uploaded files: ', files);
    // return this.filesService.create(createFileDto);
  }

  @Get('download/:id')
  downloadFile(@Param('id') id: string) {
    Logger.debug(`This should download file with id: ${id} from server`);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
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
