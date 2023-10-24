import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subjects.service';
import {
  CreateSubjectRequest,
  DeleteSubjectRequest,
  GetSubjectByIdRequest,
  PaginateSubjectRequest,
  UpdateSubjectRequest,
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
    @Body() createSubjectRequest: Omit<CreateSubjectRequest, 'isAdmin'>,
  ) {
    console.log(req.user);
    const isAdmin = req.user['isAdmin'];
    const createSubjectDto: CreateSubjectRequest = {
      ...createSubjectRequest,
      isAdmin,
    };
    return this.subjectsService.create(createSubjectDto, isAdmin);
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateSubjectRequest: Omit<UpdateSubjectRequest, 'id' | 'isAdmin'>,
  ) {
    const subjectId = Number(id);
    const isAdmin = req.user['isAdmin'];
    console.log(req.user);
    const updateSubjectDto: UpdateSubjectRequest = {
      ...updateSubjectRequest,
      id: subjectId,
      isAdmin,
    };
    const subject = this.subjectsService.update(updateSubjectDto, isAdmin);
    return subject;
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async delete(@Param('id') id: string, @Req() req: Request) {
    const subjectId = Number(id);
    const isAdmin = req.user['isAdmin'];
    const deleteSubjectDto: DeleteSubjectRequest = { id: subjectId, isAdmin };
    const subject = this.subjectsService.delete(deleteSubjectDto, isAdmin);
    return subject;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subjectId: GetSubjectByIdRequest = { id: Number(id) };
    const subject = this.subjectsService.findById(subjectId);
    return subject;
  }

  @Post('pages/:page')
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
