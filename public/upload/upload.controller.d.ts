import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: Express.Multer.File, response: Response): StreamableFile;
}
