import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const memberTypes = await prisma.memberType.findMany({
      where: {
        id: { in: ids as string[] },
      },
    });
    return ids.map((id) => memberTypes.find((memberType) => memberType.id === id));
  });
};

const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: ids as string[] },
      },
    });
    return ids.map((id) => posts.filter((post) => post.authorId === id));
  });
};

const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: { in: ids as string[] },
      },
    });
    return ids.map((id) => profiles.find((profile) => profile.userId === id));
  });
};

const subscribedToUserLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const users = await prisma.user.findMany({
      where: {
        userSubscribedTo: {
          some: {
            authorId: { in: ids as string[] },
          },
        },
      },
    });
    return ids.map(() => users);
  });
};

const userLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const users = await prisma.user.findMany({
      where: {
        id: { in: ids as string[] },
      },
      include: { subscribedToUser: true, userSubscribedTo: true },
    });
    return ids.map((id) => users.find((user) => user.id === id));
  });
};

const userSubscribedToLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids) => {
    const users = await prisma.user.findMany({
      where: {
        subscribedToUser: {
          some: {
            subscriberId: { in: ids as string[] },
          },
        },
      },
    });
    return ids.map(() => users);
  });
};

export const handleLoader = (prisma: PrismaClient) => ({
  memberTypeLoader: memberTypeLoader(prisma),
  postLoader: postLoader(prisma),
  profileLoader: profileLoader(prisma),
  subscribedToUserLoader: subscribedToUserLoader(prisma),
  userSubscribedToLoader: userSubscribedToLoader(prisma),
  userLoader: userLoader(prisma),
});
