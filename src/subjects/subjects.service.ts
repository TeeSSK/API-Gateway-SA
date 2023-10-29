import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import {
  SubjectServiceClient,
  GetSubjectByIdRequest,
  SUBJECT_SERVICE_NAME,
  CreateSubjectRequest,
  PaginateSubjectRequest,
  UpdateSubjectRequest,
  DeleteSubjectRequest,
  CreateSectionRequest,
  UpdateSectionRequest,
} from '../common/types/subject';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-subject.option';
import { map, take } from 'rxjs';
import { Section, Subject } from 'src/common/types/entity';

@Injectable()
export class SubjectService implements OnModuleInit {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private subjectService: SubjectServiceClient;

  onModuleInit() {
    this.subjectService =
      this.client.getService<SubjectServiceClient>(SUBJECT_SERVICE_NAME);
  }

  create(createSubjectRequest: CreateSubjectRequest, isAdmin: boolean) {
    if (!isAdmin) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.subjectService.createSubject(createSubjectRequest).pipe(
      map((response) => {
        const subject = response.subject;
        const newShapedSubject = this.shapedSubject(subject);
        return {
          subject: {
            ...newShapedSubject,
          },
        };
      }),

      take(1),
    );
  }

  update(updateSubjectRequest: UpdateSubjectRequest, isAdmin: boolean) {
    if (!isAdmin) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const subject = this.subjectService.updateSubject(updateSubjectRequest);
    if (!subject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return subject.pipe(
      map((response) => {
        const subject = response.subject;
        const newShapedSubject = this.shapedSubject(subject);
        return {
          subject: {
            ...newShapedSubject,
          },
        };
      }),

      take(1),
    );
  }

  delete(deleteSubjectRequest: DeleteSubjectRequest, isAdmin: boolean) {
    if (!isAdmin) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const subject = this.subjectService.deleteSubject(deleteSubjectRequest);
    if (!subject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return subject.pipe(
      map((response) => {
        const subject = response.subject;
        const newShapedSubject = this.shapedSubject(subject);
        return {
          subject: {
            ...newShapedSubject,
          },
        };
      }),

      take(1),
    );
  }

  findById(getSubjectByIdRequest: GetSubjectByIdRequest) {
    const subject = this.subjectService.getSubjectById(getSubjectByIdRequest);
    if (!subject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return subject.pipe(
      map((response) => {
        const subject = response.subject;
        const sections = response.subject.sections;
        const newShapedSubject = this.shapedSubject(subject);
        const newShapedSections = sections
          ? sections.map((section) => this.shapedSection(section))
          : [];
        return {
          subject: {
            ...newShapedSubject,
            sections: newShapedSections,
          },
        };
      }),

      take(1),
    );
  }

  paginateSubjects(paginateSubjectRequest: PaginateSubjectRequest) {
    console.log('paginateSubjects');
    console.log(paginateSubjectRequest);
    const subjects = this.subjectService.paginateSubjects(
      paginateSubjectRequest,
    );
    if (!subjects) {
      return {
        subjects: [],
        pageNumber: 0,
        perPage: 0,
        pageCount: 0,
        totalCount: 0,
      };
    }
    return subjects.pipe(
      map((response) => {
        const subjects = response.subjects.map((subject) => {
          const sections = subject.sectionNumbers;
          const newShapedSections = sections
            ? sections.map((section) => (section as any).low)
            : [];
          return {
            ...subject,
            id: (subject.id as any).low,
            semester: (subject.semester as any).low,
            year: (subject.year as any).low,
            sectionNumbers: newShapedSections,
          };
        });
        return {
          ...response,
          pageNumber: (response.pageNumber as any).low,
          perPage: (response.perPage as any).low,
          pageCount: (response.pageCount as any).low,
          totalCount: (response.totalCount as any).low,
          subjects,
        };
      }),

      take(1),
    );
  }

  shapedSubject(subject: Subject) {
    return {
      ...subject,
      id: (subject.id as any).low,
      semester: (subject.semester as any).low,
      year: (subject.year as any).low,
    };
  }

  createSection(createSectionRequest: CreateSectionRequest, isAdmin: boolean) {
    if (!isAdmin) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const section = this.subjectService.createSection(createSectionRequest);
    return section.pipe(
      map((response) => {
        const section = response.section;
        const newShapedSection = this.shapedSection(section);
        return {
          section: {
            ...newShapedSection,
          },
        };
      }),

      take(1),
    );
  }

  updateSection(updateSectionRequest: UpdateSectionRequest, isAdmin: boolean) {
    console.log('updateSection', updateSectionRequest);
    if (!isAdmin) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const section = this.subjectService.updateSection(updateSectionRequest);
    if (!section) {
      throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
    }
    return section.pipe(
      map((response) => {
        const section = response.section;
        const newShapedSection = this.shapedSection(section);
        return {
          section: {
            ...newShapedSection,
          },
        };
      }),

      take(1),
    );
  }

  deleteSection(deleteSectionRequest: DeleteSubjectRequest, isAdmin: boolean) {
    if (!isAdmin) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const section = this.subjectService.deleteSection(deleteSectionRequest);
    if (!section) {
      throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
    }
    return section.pipe(
      map((response) => {
        const section = response.section;
        const newShapedSection = this.shapedSection(section);
        return {
          section: {
            ...newShapedSection,
          },
        };
      }),

      take(1),
    );
  }

  shapedSection(section: Section) {
    return {
      ...section,
      id: (section.id as any).low,
      subjectId: (section.subjectId as any).low,
      number: (section.number as any).low,
    };
  }
}
