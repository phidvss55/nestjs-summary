import { BadRequestException, Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../../common/helpers';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, filename);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const res = this.fileService.parseFileToJson(file);
    return res;
  }

  @Post('parse-resume-path')
  public async parseResumeFromPath(@Body() body: any) {
    return this.fileService.parsePathToJson(body.path);
  }

  @Post('multiple-upload')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, filename);
        },
      }),
      // fileFilter: imageFileFilter,
    }),
  )
  public async uploadMultipleFile(@UploadedFile() files: any) {
    const res = [];
    files.map((file: any) => {
      const fileRes = {
        originalname: file.originalname,
        filename: file.filename,
      };

      res.push(fileRes);
    });

    return res;
  }
}
