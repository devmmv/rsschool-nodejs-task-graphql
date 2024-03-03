import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import IContext from '../types/context.js';
import { userObjectType } from '../query/userQuery.js';
import { UUIDType } from '../types/uuid.js';

interface ICreateUser {
  dto: {
    name: string;
    balance: number;
  };
}

const createUserObjectType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(UUIDType),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
});

export const createUser = {
  createUser: {
    type: userObjectType as GraphQLObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(createUserObjectType),
      },
    },
    resolve: async (_source, args: ICreateUser, context: IContext) => {
      return await context.prisma.user.create({
        data: args.dto,
      });
    },
  },
};