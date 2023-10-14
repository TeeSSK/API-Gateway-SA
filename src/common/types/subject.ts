/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Section, Subject, SubjectMetadata } from './entity';

export const protobufPackage = 'subject';

export interface PaginateSubjectRequest {
  pageNumber: number;
  subjectId: string;
  name: string;
  semesterWhitelist: number[];
  yearRangeStart: number;
  yearRangeStop: number;
}

export interface PaginateSubjectResponse {
  pageNumber: number;
  perPage: number;
  pageCount: number;
  totalCount: number;
  subjects: SubjectMetadata[];
}

export interface ValidateSubjectIdRequest {
  id: number;
  isAdmin: boolean;
}

export interface ValidateSubjectIdResponse {
  valid: boolean;
}

export interface GetSubjectByIdRequest {
  id: number;
}

export interface GetSubjectByIdResponse {
  subject: Subject | undefined;
}

export interface CreateSubjectRequest {
  subjectId: string;
  name: string;
  semester: number;
  year: number;
  faculty: string;
  description: string;
  isAdmin: boolean;
}

export interface CreateSubjectResponse {
  subject: Subject | undefined;
}

export interface UpdateSubjectRequest {
  id: number;
  subjectId: string;
  name: string;
  semester: number;
  year: number;
  faculty: string;
  description: string;
  prerequisites: string[];
  isAdmin: boolean;
}

export interface UpdateSubjectResponse {
  subject: Subject | undefined;
}

export interface DeleteSubjectRequest {
  id: number;
  isAdmin: boolean;
}

export interface DeleteSubjectResponse {
  subject: Subject | undefined;
}

export interface CreateSectionRequest {
  subjectId: number;
  number: number;
  description: string;
  isAdmin: boolean;
}

export interface CreateSectionResponse {
  section: Section | undefined;
}

export interface UpdateSectionRequest {
  id: number;
  number: number;
  description: string;
  isAdmin: boolean;
}

export interface UpdateSectionResponse {
  section: Section | undefined;
}

export interface DeleteSectionRequest {
  id: number;
  isAdmin: boolean;
}

export interface DeleteSectionResponse {
  section: Section | undefined;
}

export interface PaginatePostBySubjectRequest {}

export interface PaginatePostBySubjectResponse {}

export interface PaginateFileBySubjectRequest {}

export interface PaginateFileBySubjectResponse {}

export const SUBJECT_PACKAGE_NAME = 'subject';

export interface SubjectServiceClient {
  paginateSubjects(
    request: PaginateSubjectRequest,
  ): Observable<PaginateSubjectResponse>;

  getSubjectById(
    request: GetSubjectByIdRequest,
  ): Observable<GetSubjectByIdResponse>;

  validateSubjectId(
    request: ValidateSubjectIdRequest,
  ): Observable<ValidateSubjectIdResponse>;

  createSubject(
    request: CreateSubjectRequest,
  ): Observable<CreateSubjectResponse>;

  updateSubject(
    request: UpdateSubjectRequest,
  ): Observable<UpdateSubjectResponse>;

  deleteSubject(
    request: DeleteSubjectRequest,
  ): Observable<DeleteSubjectResponse>;

  createSection(
    request: CreateSectionRequest,
  ): Observable<CreateSectionResponse>;

  updateSection(
    request: UpdateSectionRequest,
  ): Observable<UpdateSectionResponse>;

  deleteSection(
    request: DeleteSectionRequest,
  ): Observable<DeleteSectionResponse>;

  paginatePostBySubject(
    request: PaginatePostBySubjectRequest,
  ): Observable<PaginatePostBySubjectResponse>;

  paginateFileBySubject(
    request: PaginateFileBySubjectRequest,
  ): Observable<PaginateFileBySubjectResponse>;
}

export interface SubjectServiceController {
  paginateSubjects(
    request: PaginateSubjectRequest,
  ):
    | Promise<PaginateSubjectResponse>
    | Observable<PaginateSubjectResponse>
    | PaginateSubjectResponse;

  getSubjectById(
    request: GetSubjectByIdRequest,
  ):
    | Promise<GetSubjectByIdResponse>
    | Observable<GetSubjectByIdResponse>
    | GetSubjectByIdResponse;

  validateSubjectId(
    request: ValidateSubjectIdRequest,
  ):
    | Promise<ValidateSubjectIdResponse>
    | Observable<ValidateSubjectIdResponse>
    | ValidateSubjectIdResponse;

  createSubject(
    request: CreateSubjectRequest,
  ):
    | Promise<CreateSubjectResponse>
    | Observable<CreateSubjectResponse>
    | CreateSubjectResponse;

  updateSubject(
    request: UpdateSubjectRequest,
  ):
    | Promise<UpdateSubjectResponse>
    | Observable<UpdateSubjectResponse>
    | UpdateSubjectResponse;

  deleteSubject(
    request: DeleteSubjectRequest,
  ):
    | Promise<DeleteSubjectResponse>
    | Observable<DeleteSubjectResponse>
    | DeleteSubjectResponse;

  createSection(
    request: CreateSectionRequest,
  ):
    | Promise<CreateSectionResponse>
    | Observable<CreateSectionResponse>
    | CreateSectionResponse;

  updateSection(
    request: UpdateSectionRequest,
  ):
    | Promise<UpdateSectionResponse>
    | Observable<UpdateSectionResponse>
    | UpdateSectionResponse;

  deleteSection(
    request: DeleteSectionRequest,
  ):
    | Promise<DeleteSectionResponse>
    | Observable<DeleteSectionResponse>
    | DeleteSectionResponse;

  paginatePostBySubject(
    request: PaginatePostBySubjectRequest,
  ):
    | Promise<PaginatePostBySubjectResponse>
    | Observable<PaginatePostBySubjectResponse>
    | PaginatePostBySubjectResponse;

  paginateFileBySubject(
    request: PaginateFileBySubjectRequest,
  ):
    | Promise<PaginateFileBySubjectResponse>
    | Observable<PaginateFileBySubjectResponse>
    | PaginateFileBySubjectResponse;
}

export function SubjectServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'paginateSubjects',
      'getSubjectById',
      'validateSubjectId',
      'createSubject',
      'updateSubject',
      'deleteSubject',
      'createSection',
      'updateSection',
      'deleteSection',
      'paginatePostBySubject',
      'paginateFileBySubject',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('SubjectService', method)(
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
      GrpcStreamMethod('SubjectService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SUBJECT_SERVICE_NAME = 'SubjectService';
