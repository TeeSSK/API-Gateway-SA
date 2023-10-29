import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  CreateBookmarkFileRequest,
  DeleteBookmarkFileRequest,
  FileDownloadRequest,
  FileUploadRequest,
  GetBookmarkFilesRequest,
  SearchFileRequest,
} from 'src/common/types/file_storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Request, Response } from 'express';
import { fileUploadDto } from './dto/upload-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  searchFiles(
    @Query()
    query: {
      subjectId: string;
      ownerUserId: string;
      fileName: string;
    },
  ) {
    const searchFileRequest: SearchFileRequest = {
      subjectId: query.subjectId ?? '',
      ownerUserId: query.ownerUserId ?? '',
      fileName: query.fileName ?? '',
    };

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
    return this.filesService.upload(fileUploadRequest);
  }

  @Get('download/:fileId')
  async downloadFile(@Param('fileId') id: string, @Res() res: Response) {
    const fileDownloadRequest: FileDownloadRequest = { fileId: id, userId: '' };
    console.log('fileDownloadRequest', fileDownloadRequest);
    const { fileContent, fileName, fileSize } =
      await this.filesService.download(fileDownloadRequest);
    console.log('responseData', { fileContent, fileName, fileSize });

    const contentDisposition = `attachment; filename=${fileName}`;
    // Set the appropriate response headers
    res.setHeader('Content-Type', 'application/octet-stream'); // Set the appropriate content type
    res.setHeader('Content-Disposition', contentDisposition); // Specify the filename
    res.setHeader('Content-Length', fileContent.length.toString());
    console.log(fileContent);

    // Send the Uint8Array as the response body
    res.send(Buffer.from(fileContent));
  }

  @Get('bookmark')
  @UseGuards(AccessTokenGuard)
  getBookmarkFile(@Req() req: Request) {
    const userId = req.user['id'];
    const getBookmarkFileRequest: GetBookmarkFilesRequest = {
      userId,
    };
    return this.filesService.getBookmark(getBookmarkFileRequest);
  }

  @Post('bookmark')
  @UseGuards(AccessTokenGuard)
  createBookmarkFile(
    @Body() body: Omit<CreateBookmarkFileRequest, 'userId'>,
    @Req() req: Request,
  ) {
    const userId = req.user['id'];
    const id = body.fileId;
    const createBookmarkRequest: CreateBookmarkFileRequest = {
      fileId: id,
      userId,
    };
    return this.filesService.createBookmark(createBookmarkRequest);
  }

  @Delete('bookmark')
  @UseGuards(AccessTokenGuard)
  deleteBookmarkFile(
    @Body() body: Omit<DeleteBookmarkFileRequest, 'userId'>,
    @Req() req: Request,
  ) {
    const userId = req.user['id'];
    const id = body.fileId;
    const deleteBookmarkRequest: DeleteBookmarkFileRequest = {
      fileId: id,
      userId,
    };
    return this.filesService.deleteBookmark(deleteBookmarkRequest);
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
