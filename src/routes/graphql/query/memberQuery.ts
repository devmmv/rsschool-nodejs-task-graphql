import { MemberType } from '@prisma/client';
import IContext from '../types/context.js';
import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';
import { profileObjectTypeList } from './profileQuery.js';

export const memberEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  description: 'A MemberTypeId',
  values: {
    basic: {
      value: MemberTypeId.BASIC,
      description: 'basic',
    },
    business: {
      value: MemberTypeId.BUSINESS,
      description: 'business',
    },
  },
});

export const memberObjectType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'A MemberType',
  fields: () => ({
    id: {
      type: memberEnumType,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
    profiles: {
      type: profileObjectTypeList,
      description: 'The profiles',
      resolve: async (source: MemberType, _args, context: IContext) => {
        return await context.prisma.profile.findMany({
          where: {
            memberTypeId: source.id,
          },
        });
      },
    },
  }),
});

export const memberObjectTypeList = new GraphQLList(memberObjectType);
export const memberQuery = {
  memberType: {
    type: memberObjectType as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(memberEnumType),
      },
    },
    resolve: async (_source, args: MemberType, context: IContext) => {
      return await context.prisma.memberType.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  memberTypes: {
    type: memberObjectTypeList,
    resolve: async (_source, _args, context: IContext) => {
      return await context.prisma.memberType.findMany();
    },
  },
};
