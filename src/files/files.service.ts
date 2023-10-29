import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { grpcClientOptions } from './grpc-file.option';
import { Client, ClientGrpc } from '@nestjs/microservices';
import {
  CreateBookmarkFileRequest,
  DeleteBookmarkFileRequest,
  FILE_UPLOAD_SERVICE_NAME,
  FileDeleteRequest,
  FileDownloadRequest,
  FileUploadRequest,
  FileUploadServiceClient,
  GetBookmarkFilesRequest,
  SearchFileRequest,
  ShareFileRequest,
} from 'src/common/types/file_storage';
import { ReplaySubject, lastValueFrom, scan } from 'rxjs';

@Injectable()
export class FilesService {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private fileService: FileUploadServiceClient;

  onModuleInit() {
    this.fileService = this.client.getService<FileUploadServiceClient>(
      FILE_UPLOAD_SERVICE_NAME,
    );
  }

  upload(fileUploadRequest: FileUploadRequest) {
    const fileUpload$ = new ReplaySubject<FileUploadRequest>();
    // const file = FileUploadRequest.fileContent;

    fileUpload$.next(fileUploadRequest);
    // fileUpload$.next({ greeting: 'Hello (2)!' });
    fileUpload$.complete();

    return this.fileService.upload(fileUpload$);
  }

  async download(fileDownloadRequest: FileDownloadRequest) {
    const fileData = this.fileService.download(fileDownloadRequest);
    if (!fileData) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    const allData = await lastValueFrom(
      fileData.pipe(
        scan((acc, value) => {
          acc.push(value);
          return acc;
        }, []),
      ),
    );
    const fileSize = allData[0].size;
    const fileName = allData[0].fileName;
    const allFileContent = allData.map((data) => data.fileContent);
    const newFileContent = this.concat(allFileContent);
    // fileData.subscribe({
    //   next: (file) => {
    //     fileContentCollection.push(file.fileContent);
    //     console.log(file);
    //     return console.log(file);
    //   },
    //   error: (e) => console.error(e),
    //   complete: () => {
    //     console.log('complete', fileContentCollection);
    //     return console.info('complete');
    //   },
    // });
    return {
      fileContent: newFileContent,
      fileName: fileName,
      fileSize: fileSize,
    };
  }

  searchFiles(searchFileRequest: SearchFileRequest) {
    return this.fileService.searchFile(searchFileRequest);
  }

  delete(fileDeleteRequest: FileDeleteRequest) {
    return this.fileService.delete(fileDeleteRequest);
  }

  shareFile(shareFileRequest: ShareFileRequest) {
    return this.fileService.shareFile(shareFileRequest);
  }

  createBookmark(createBookmarkFileRequest: CreateBookmarkFileRequest) {
    const createResponse = this.fileService.createBookmarkFile(
      createBookmarkFileRequest,
    );
    console.log(createResponse);
    if (!createResponse) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    return createResponse;
  }

  deleteBookmark(deleteBookmarkFileRequest: DeleteBookmarkFileRequest) {
    return this.fileService.deleteBookmarkFile(deleteBookmarkFileRequest);
  }

  getBookmark(getBookmarkFilesRequest: GetBookmarkFilesRequest) {
    return this.fileService.getBookmarkFiles(getBookmarkFilesRequest);
  }

  concat(arrays: Array<Uint8Array>) {
    const arr = arrays.reduce((pre, cur) => {
      return pre.concat(Array.from(cur));
    }, []);
    console.log(new Uint8Array(arr));
    return new Uint8Array(arr);
  }

  appendUint8Arrays(buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
    console.log('appendUint8Arrays', buffer1);
    let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp;
  }
}
