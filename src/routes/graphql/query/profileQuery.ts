import { Profile } from '@prisma/client';
import IContext from '../types/context.js';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { userObjectType } from './userQuery.js';
import { memberEnumType, memberObjectType } from './memberQuery.js';

export const profileObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    user: {
      type: userObjectType as GraphQLObjectType,
      resolve: async (source: Profile, _args, context: IContext) => {
        return await context.prisma.user.findUnique({
          where: {
            id: source.userId,
          },
        });
      },
    },
    userId: {
      type: UUIDType,
    },
    memberType: {
      type: memberObjectType as GraphQLObjectType,
      resolve: async (source: Profile, _args, context: IContext) => {
        return await context.loaders.memberTypeLoader.load(source.memberTypeId);
      },
    },
    memberTypeId: {
      type: memberEnumType,
    },
  }),
});

export const profileObjectTypeList = new GraphQLList(profileObjectType);

export const profileQuery = {
  profile: {
    type: profileObjectType as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: Profile, context: IContext) => {
      return await context.prisma.profile.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  profiles: {
    type: profileObjectTypeList,
    resolve: async (_source, _args, context: IContext) => {
      return await context.prisma.profile.findMany();
    },
  },
};