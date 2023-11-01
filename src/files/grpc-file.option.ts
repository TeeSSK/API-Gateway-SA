import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { FILE_SERVICE_URL } from 'src/common/constants/service-url';
import { FILESTORAGE_PACKAGE_NAME } from 'src/common/types/file_storage';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: FILE_SERVICE_URL,
    package: FILESTORAGE_PACKAGE_NAME,
    protoPath: [join(__dirname, '../proto/file_storage.proto')],
  },
};
