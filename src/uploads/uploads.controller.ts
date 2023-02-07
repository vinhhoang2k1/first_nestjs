import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ApiFile, ApiMultiFile } from 'src/common/swagger/ApiFile';
import { editFileName, imageFileFilter } from './helper-file';
import { UploadsService } from './uploads.service';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private uploadService: UploadsService) {}

  @Post('')
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @ApiFile('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @Req() req) {
    const response = {
      fullPath: this.uploadService.getFullPath(req, file),
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple')
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile('images')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files, @Req() req) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        fullPath: this.uploadService.getFullPath(req, file),
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
