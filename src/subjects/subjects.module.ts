import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SUBJECT_PACKAGE_NAME } from '../common/types/subject';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SUBJECT_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:8080',
          package: SUBJECT_PACKAGE_NAME,
          protoPath: [
            join(__dirname, '../proto/entity.proto'),
            join(__dirname, '../proto/subject.proto'),
            join(__dirname, '../proto/instructor.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  // exports: [SubjectsService],
})
export class SubjectModule {}
