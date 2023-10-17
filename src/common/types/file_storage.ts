/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "filestorage";

export interface FileUploadRequest {
  fileContent: Uint8Array;
  fileName?: string | undefined;
  userId?: string | undefined;
  subjectId?: string | undefined;
}

export interface FileUploadResponse {
  fileId: string;
  size: number;
}

export interface FileDownloadRequest {
  fileId: string;
  userId: string;
}

export interface FileDownloadResponse {
  fileContent: Uint8Array;
  size?: number | undefined;
  fileName?: string | undefined;
}

export interface FileDeleteRequest {
  fileId: string;
  userId: string;
}

export interface FileDeleteResponse {
  fileId: string;
}

export interface ShareFileRequest {
  fileId: string;
  userId: string;
  shareWithUserIds: string[];
}

export interface ShareFileResponse {
  fileId: string;
}

export interface CreateBookmarkFileRequest {
  fileId: string;
  userId: string;
}

export interface CreateBookmarkFileResponse {
  fileId: string;
}

export interface DeleteBookmarkFileRequest {
  fileId: string;
  userId: string;
}

export interface DeleteBookmarkFileResponse {
  fileId: string;
}

export interface GetBookmarkFilesRequest {
  userId: string;
}

export interface GetBookmarkFilesResponse {
  fileIds: string[];
}

export interface SearchFileRequest {
  subjectId: string;
  ownerUserId: string;
  fileName: string;
}

export interface SearchFileResponse {
  fileIds: string[];
  fileNames: string[];
  subjectIds: string[];
  ownerUserIds: string[];
}

export const FILESTORAGE_PACKAGE_NAME = "filestorage";

export interface FileUploadServiceClient {
  upload(request: Observable<FileUploadRequest>): Observable<FileUploadResponse>;

  download(request: FileDownloadRequest): Observable<FileDownloadResponse>;

  delete(request: FileDeleteRequest): Observable<FileDeleteResponse>;

  shareFile(request: ShareFileRequest): Observable<ShareFileResponse>;

  createBookmarkFile(request: CreateBookmarkFileRequest): Observable<CreateBookmarkFileResponse>;

  deleteBookmarkFile(request: DeleteBookmarkFileRequest): Observable<DeleteBookmarkFileResponse>;

  getBookmarkFiles(request: GetBookmarkFilesRequest): Observable<GetBookmarkFilesResponse>;

  searchFile(request: SearchFileRequest): Observable<SearchFileResponse>;
}

export interface FileUploadServiceController {
  upload(
    request: Observable<FileUploadRequest>,
  ): Promise<FileUploadResponse> | Observable<FileUploadResponse> | FileUploadResponse;

  download(request: FileDownloadRequest): Observable<FileDownloadResponse>;

  delete(request: FileDeleteRequest): Promise<FileDeleteResponse> | Observable<FileDeleteResponse> | FileDeleteResponse;

  shareFile(request: ShareFileRequest): Promise<ShareFileResponse> | Observable<ShareFileResponse> | ShareFileResponse;

  createBookmarkFile(
    request: CreateBookmarkFileRequest,
  ): Promise<CreateBookmarkFileResponse> | Observable<CreateBookmarkFileResponse> | CreateBookmarkFileResponse;

  deleteBookmarkFile(
    request: DeleteBookmarkFileRequest,
  ): Promise<DeleteBookmarkFileResponse> | Observable<DeleteBookmarkFileResponse> | DeleteBookmarkFileResponse;

  getBookmarkFiles(
    request: GetBookmarkFilesRequest,
  ): Promise<GetBookmarkFilesResponse> | Observable<GetBookmarkFilesResponse> | GetBookmarkFilesResponse;

  searchFile(
    request: SearchFileRequest,
  ): Promise<SearchFileResponse> | Observable<SearchFileResponse> | SearchFileResponse;
}

export function FileUploadServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "download",
      "delete",
      "shareFile",
      "createBookmarkFile",
      "deleteBookmarkFile",
      "getBookmarkFiles",
      "searchFile",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FileUploadService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["upload"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FileUploadService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FILE_UPLOAD_SERVICE_NAME = "FileUploadService";
