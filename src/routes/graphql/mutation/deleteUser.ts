import { GraphQLNonNull } from 'graphql';
import IContext from '../types/context.js';
import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';

export const deleteUser = {
  deleteUser: {
    type: new GraphQLNonNull(UUIDType),
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: User, context: IContext) => {
      await context.prisma.user.delete({
        where: {
          id: args.id,
        },
      });
      return args.id;
    },
  },
};
