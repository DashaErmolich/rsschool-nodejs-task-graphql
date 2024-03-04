import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { FieldNode } from 'graphql';
import { Profile } from './profile.model.js';
export interface Context {
  dataClient: PrismaClient;
  dataLoaders: WeakMap<readonly FieldNode[], DataLoader<string, Partial<Profile> | undefined>>,
}
