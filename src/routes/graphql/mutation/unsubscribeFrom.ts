import { GraphQLNonNull } from 'graphql';
import IContext from '../types/context.js';
import { UUIDType } from '../types/uuid.js';

interface IUnsubscribeFrom {
  userId: string;
  authorId: string;
}

export const unsubscribeFrom = {
  unsubscribeFrom: {
    type: UUIDType,
    args: {
      userId: {
        type: new GraphQLNonNull(UUIDType),
      },
      authorId: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: IUnsubscribeFrom, context: IContext) => {
      await context.prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        },
      });
      return args.userId;
    },
  },
};
