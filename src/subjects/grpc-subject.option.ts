import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { SUBJECT_PACKAGE_NAME } from 'src/common/types/subject';

export const grpcClientOptions: ClientOptions = {
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
};
