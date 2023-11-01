import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { SUBJECT_SERVICE_URL } from 'src/common/constants/service-url';
import { SUBJECT_PACKAGE_NAME } from 'src/common/types/subject';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: SUBJECT_SERVICE_URL,
    package: SUBJECT_PACKAGE_NAME,
    protoPath: [
      join(__dirname, '../proto/entity.proto'),
      join(__dirname, '../proto/subject.proto'),
      join(__dirname, '../proto/instructor.proto'),
    ],
  },
};
