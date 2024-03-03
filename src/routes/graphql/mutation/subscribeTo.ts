import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import IContext from '../types/context.js';
import { userObjectType } from '../query/userQuery.js';
import { UUIDType } from '../types/uuid.js';

interface ISubscribeTo {
  userId: string;
  authorId: string;
}

export const subscribeTo = {
  subscribeTo: {
    type: userObjectType as GraphQLObjectType,
    args: {
      userId: {
        type: new GraphQLNonNull(UUIDType),
      },
      authorId: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: ISubscribeTo, context: IContext) => {
      return await context.prisma.user.update({
        where: {
          id: args.userId,
        },
        data: {
          userSubscribedTo: {
            create: {
              authorId: args.authorId,
            },
          },
        },
      });
    },
  },
};
