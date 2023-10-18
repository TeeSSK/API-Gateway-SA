import { Injectable } from '@nestjs/common';
import { grpcClientOptions } from './grpc-file.option';
import { Client, ClientGrpc } from '@nestjs/microservices';
import {
  FILE_UPLOAD_SERVICE_NAME,
  FileUploadRequest,
  FileUploadServiceClient,
  SearchFileRequest,
} from 'src/common/types/file_storage';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class FilesService {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private fileService: FileUploadServiceClient;

  onModuleInit() {
    this.fileService = this.client.getService<FileUploadServiceClient>(
      FILE_UPLOAD_SERVICE_NAME,
    );
  }

  uploadFile(FileUploadRequest: FileUploadRequest) {
    const fileUpload$ = new ReplaySubject<FileUploadRequest>();
    // const file = FileUploadRequest.fileContent;

    fileUpload$.next(FileUploadRequest);
    // fileUpload$.next({ greeting: 'Hello (2)!' });
    fileUpload$.complete();

    return this.fileService.upload(fileUpload$);
  }

  searchFiles(SearchFileRequest: SearchFileRequest) {
    return this.fileService.searchFile(SearchFileRequest);
  }
}
