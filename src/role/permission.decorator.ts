import { SetMetadata } from '@nestjs/common';

export const HasPermission = (permission: string) =>
  SetMetadata('permission', permission);
