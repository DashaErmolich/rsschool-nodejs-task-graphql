import { PrismaClient } from '@prisma/client';

export interface Context {
  dataClient: PrismaClient;
}
