import { Post } from '@prisma/client';
import IContext from '../types/context.js';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { userObjectType } from './userQuery.js';

export const postObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    title: {
      type: UUIDType,
    },
    content: {
      type: UUIDType,
    },
    author: {
      type: userObjectType as GraphQLObjectType,
      description: 'The author',
      resolve: async (source: Post, _args, context: IContext) => {
        return await context.prisma.user.findUnique({
          where: {
            id: source.authorId,
          },
        });
      },
    },
    authorId: {
      type: UUIDType,
    },
  }),
});

export const postObjectTypeList = new GraphQLList(postObjectType);

export const postQuery = {
  post: {
    type: postObjectType as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: Post, context: IContext) => {
      return await context.prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  posts: {
    type: postObjectTypeList,
    resolve: async (_source, _args, context: IContext) => {
      return await context.prisma.post.findMany();
    },
  },
};