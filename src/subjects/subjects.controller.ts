import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import {
  CreateSubjectRequest,
  GetSubjectByIdRequest,
} from '../common/types/subject';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() createSubjectRequest: CreateSubjectRequest) {
    return this.subjectsService.create(createSubjectRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('findbyid', id);
    const subjectId: GetSubjectByIdRequest = { id: Number(id) };
    return this.subjectsService.findById(subjectId);
  }
}
