import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subjects.service';
import {
  CreateSubjectRequest,
  GetSubjectByIdRequest,
  PaginateSubjectRequest,
} from '../common/types/subject';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Request } from 'express';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(
    @Req() req: Request,
    @Body() createSubjectRequest: CreateSubjectRequest,
  ) {
    console.log(req.user);
    const isAdmin = req.user['isAdmin'];
    return this.subjectsService.create(createSubjectRequest, isAdmin);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subjectId: GetSubjectByIdRequest = { id: Number(id) };
    const subject = this.subjectsService.findById(subjectId);
    return subject;
  }

  @Get('pages/:page')
  findAll(
    @Param('page') page: string,
    @Body() paginateSubjectRequest: Omit<PaginateSubjectRequest, 'pageNumber'>,
  ) {
    const pageNumber = Number(page);
    const paginateSubjectDto: PaginateSubjectRequest = {
      pageNumber,
      ...paginateSubjectRequest,
    };
    return this.subjectsService.paginateSubjects(paginateSubjectDto);
  }
}
