import { GraphQLNonNull } from 'graphql';
import IContext from '../types/context.js';
import { Post } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';

export const deletePost = {
  deletePost: {
    type: new GraphQLNonNull(UUIDType),
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: Post, context: IContext) => {
      await context.prisma.post.delete({
        where: {
          id: args.id,
        },
      });
      return args.id;
    },
  },
};
