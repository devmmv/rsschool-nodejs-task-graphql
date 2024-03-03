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

interface ICreateProfile {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
  };
}

const createProfileObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: new GraphQLNonNull(memberEnumType),
    },
  }),
});

export const createProfile = {
  createProfile: {
    type: profileObjectType as GraphQLObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(createProfileObjectType),
      },
    },
    resolve: async (_source, args: ICreateProfile, context: IContext) => {
      return await context.prisma.profile.create({
        data: args.dto,
      });
    },
  },
};