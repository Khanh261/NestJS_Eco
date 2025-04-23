import { Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import LocalFilesInterceptor from 'src/common/helpers/localFiles.interceptor';
import {
  Controller,
  Get,
  Param,
  ClassSerializerInterceptor,
  StreamableFile,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/images',
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) response: Response,
  ) {
    const stream = createReadStream(join(process.cwd(), file.path));

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });
    return new StreamableFile(stream);
  }
}
