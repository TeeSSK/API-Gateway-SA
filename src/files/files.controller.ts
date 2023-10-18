import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  FileUploadRequest,
  SearchFileRequest,
} from 'src/common/types/file_storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Request } from 'express';
import { fileUploadDto } from './dto/upload-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  searchFiles(@Body() searchFileRequest: SearchFileRequest) {
    return this.filesService.searchFiles(searchFileRequest);
  }

  @Post('upload')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: fileUploadDto,
  ) {
    const userId = req.user['id'];
    const subjectId = body.subjectId;
    const fileUploadRequest: FileUploadRequest = {
      fileContent: new Uint8Array(file.buffer),
      fileName: file.originalname,
      userId: userId,
      subjectId: subjectId,
    };
    return this.filesService.uploadFile(fileUploadRequest);
  }

  @Post('test')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    console.log(file);
    console.log(body.subjectId);
    console.log(typeof body.subjectId);
    const uArray = new Uint8Array(file.buffer);
    console.log(uArray);
    console.log(uArray.length);
    return 'test';
  }
}
