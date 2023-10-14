/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "filestorage";

export interface FileUploadRequest {
  fileContent: Uint8Array;
  fileName?: string | undefined;
}

export interface FileUploadResponse {
  fileName: string;
  size: number;
}

export const FILESTORAGE_PACKAGE_NAME = "filestorage";

export interface FileUploadServiceClient {
  upload(request: Observable<FileUploadRequest>): Observable<FileUploadResponse>;
}

export interface FileUploadServiceController {
  upload(
    request: Observable<FileUploadRequest>,
  ): Promise<FileUploadResponse> | Observable<FileUploadResponse> | FileUploadResponse;
}

export function FileUploadServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [];
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
