import { MemberType, Post, Prisma, PrismaClient, Profile, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library.js';
import DataLoader from 'dataloader';

interface Loaders {
  memberTypeLoader: DataLoader<string, MemberType>;
  postLoader: DataLoader<string, Post[]>;
  profileLoader: DataLoader<string, Profile>;
  subscribedToUserLoader: DataLoader<string, User[]>;
  userSubscribedToLoader: DataLoader<string, User[]>;
  userLoader: DataLoader<string, User>;
}

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  loaders: Loaders;
}

export default Context;
