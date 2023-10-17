import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectService } from './subjects.service';

@Module({
  imports: [],
  controllers: [SubjectsController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
