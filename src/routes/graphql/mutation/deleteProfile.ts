import { GraphQLNonNull } from 'graphql';
import IContext from '../types/context.js';
import { Profile } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';

export const deleteProfile = {
  deleteProfile: {
    type: new GraphQLNonNull(UUIDType),
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: Profile, context: IContext) => {
      await context.prisma.profile.delete({
        where: {
          id: args.id,
        },
      });
      return args.id;
    },
  },
};
