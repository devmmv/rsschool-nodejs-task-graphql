import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import IContext from '../types/context.js';
import { userObjectType } from '../query/userQuery.js';
import { UUIDType } from '../types/uuid.js';

interface IChangeUser {
  id: string;
  dto: {
    name: string;
    balance: number;
  };
}

const changeUserObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: {
      type: UUIDType,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});

export const changeUser = {
  changeUser: {
    type: userObjectType as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(changeUserObjectType),
      },
    },
    resolve: async (_source, args: IChangeUser, context: IContext) => {
      return await context.prisma.user.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};