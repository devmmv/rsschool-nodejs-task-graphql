import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import IContext from '../types/context.js';
import { profileObjectType } from '../query/profileQuery.js';
import { UUIDType } from '../types/uuid.js';
import { memberEnumType } from '../query/memberQuery.js';

interface IChangeProfile {
  id: string;
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
  };
}

const changeProfileObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: memberEnumType,
    },
  }),
});

export const changeProfile = {
  changeProfile: {
    type: profileObjectType as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(changeProfileObjectType),
      },
    },
    resolve: async (_source, args: IChangeProfile, context: IContext) => {
      return await context.prisma.profile.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};