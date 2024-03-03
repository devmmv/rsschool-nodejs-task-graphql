import { User } from '@prisma/client';
import IContext from '../types/context.js';
import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from 'graphql';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { UUIDType } from '../types/uuid.js';
import { profileObjectType } from './profileQuery.js';
import { postObjectTypeList } from './postQuery.js';

interface IUserSubscribed extends User {
  userSubscribedTo?: {
    subscriberId: string;
    authorId: string;
  }[];
  subscribedToUser?: {
    subscriberId: string;
    authorId: string;
  }[];
}

export const userObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: UUIDType,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: profileObjectType as GraphQLObjectType,
      resolve: async (source: User, _args, context: IContext) => {
        return await context.loaders.profileLoader.load(source.id);
      },
    },
    posts: {
      type: postObjectTypeList,
      resolve: async (source: User, _args: User, context: IContext) => {
        return await context.loaders.postLoader.load(source.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userObjectType),
      description: 'The userSubscribedTo',
      resolve: async (source: IUserSubscribed, _args, context: IContext) => {
        if (source.userSubscribedTo) {
          const authorsId = source.userSubscribedTo.map((user) => user.authorId);
          return await context.loaders.userLoader.loadMany(authorsId);
        }
        return await context.loaders.userSubscribedToLoader.load(source.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userObjectType),
      description: 'The subscribedToUser',
      resolve: async (source: IUserSubscribed, _args, context: IContext) => {
        if (source.subscribedToUser) {
          const subscribersId = source.subscribedToUser.map((user) => user.subscriberId);
          return await context.loaders.userLoader.loadMany(subscribersId);
        }
        return await context.loaders.subscribedToUserLoader.load(source.id);
      },
    },
  }),
});
export const userObjectTypeList = new GraphQLList(userObjectType);

export const userQuery = {
  user: {
    type: userObjectType as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: User, context: IContext) => {
      return await context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  users: {
    type: userObjectTypeList,
    resolve: async (
      _source,
      _args,
      context: IContext,
      resolveInfo: GraphQLResolveInfo,
    ) => {
      const parsedResolveInfoFragment = parseResolveInfo(resolveInfo);
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfoFragment as ResolveTree,
        userObjectTypeList,
      );
      const userSubscribedTo = 'userSubscribedTo' in fields;
      const subscribedToUser = 'subscribedToUser' in fields;

      const users = await context.prisma.user.findMany({
        include: {
          userSubscribedTo,
          subscribedToUser,
        },
      });

      users.forEach((user) => {
        context.loaders.userLoader.prime(user.id, user);
      });

      return users;
    },
  },
};
