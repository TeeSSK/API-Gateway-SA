import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubjectService } from './subjects.service';
import {
  CreateSubjectRequest,
  GetSubjectByIdRequest,
  PaginateSubjectRequest,
} from '../common/types/subject';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectService) {}

  @Post()
  create(@Body() createSubjectRequest: CreateSubjectRequest) {
    return this.subjectsService.create(createSubjectRequest);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subjectId: GetSubjectByIdRequest = { id: Number(id) };
    const subject = this.subjectsService.findById(subjectId);
    return subject;
  }

  @Get()
  findAll(@Body() paginateSubjectRequest: PaginateSubjectRequest) {
    return this.subjectsService.paginateSubjects(paginateSubjectRequest);
  }
}
