import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { FILESTORAGE_PACKAGE_NAME } from 'src/common/types/file_storage';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:8081',
    package: FILESTORAGE_PACKAGE_NAME,
    protoPath: [join(__dirname, '../proto/file_storage.proto')],
  },
};
