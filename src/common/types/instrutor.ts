/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Instructor, InstructorMetadata } from './entity';

export const protobufPackage = 'subject';

export interface PaginateInstructorRequest {
  pageNumber: number;
  name: string;
  faculty: string;
}

export interface PaginateInstructorResponse {
  pageNumber: number;
  perPage: number;
  pageCount: number;
  totalCount: number;
  instructors: InstructorMetadata[];
}

export interface GetInstructorbyIdRequest {
  id: number;
}

export interface GetInstructorbyIdResponse {
  instructor: Instructor | undefined;
}

export interface CreateInstructorRequest {
  fullName: string;
  faculty: string;
  email: string;
  phoneNumber: string;
  website: string;
  degree: string;
  isAdmin: boolean;
}

export interface CreateInstructorResponse {
  instructor: Instructor | undefined;
}

export interface UpdateInstructorRequest {
  id: number;
  fullName: string;
  faculty: string;
  email: string;
  phoneNumber: string;
  website: string;
  degree: string;
  isAdmin: boolean;
}

export interface UpdateInstructorResponse {
  instructor: Instructor | undefined;
}

export interface DeleteInstructorRequest {
  id: number;
  isAdmin: boolean;
}

export interface DeleteInstructorResponse {
  instructor: Instructor | undefined;
}

export const SUBJECT_PACKAGE_NAME = 'subject';

export interface InstructorServiceClient {
  paginateInstructor(
    request: PaginateInstructorRequest,
  ): Observable<PaginateInstructorResponse>;

  getInstructorbyId(
    request: GetInstructorbyIdRequest,
  ): Observable<GetInstructorbyIdResponse>;

  createInstructor(
    request: CreateInstructorRequest,
  ): Observable<CreateInstructorResponse>;

  updateInstructor(
    request: UpdateInstructorRequest,
  ): Observable<UpdateInstructorResponse>;

  deleteInstructor(
    request: DeleteInstructorRequest,
  ): Observable<DeleteInstructorResponse>;
}

export interface InstructorServiceController {
  paginateInstructor(
    request: PaginateInstructorRequest,
  ):
    | Promise<PaginateInstructorResponse>
    | Observable<PaginateInstructorResponse>
    | PaginateInstructorResponse;

  getInstructorbyId(
    request: GetInstructorbyIdRequest,
  ):
    | Promise<GetInstructorbyIdResponse>
    | Observable<GetInstructorbyIdResponse>
    | GetInstructorbyIdResponse;

  createInstructor(
    request: CreateInstructorRequest,
  ):
    | Promise<CreateInstructorResponse>
    | Observable<CreateInstructorResponse>
    | CreateInstructorResponse;

  updateInstructor(
    request: UpdateInstructorRequest,
  ):
    | Promise<UpdateInstructorResponse>
    | Observable<UpdateInstructorResponse>
    | UpdateInstructorResponse;

  deleteInstructor(
    request: DeleteInstructorRequest,
  ):
    | Promise<DeleteInstructorResponse>
    | Observable<DeleteInstructorResponse>
    | DeleteInstructorResponse;
}

export function InstructorServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'paginateInstructor',
      'getInstructorbyId',
      'createInstructor',
      'updateInstructor',
      'deleteInstructor',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('InstructorService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('InstructorService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const INSTRUCTOR_SERVICE_NAME = 'InstructorService';
