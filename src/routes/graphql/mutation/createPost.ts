import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import IContext from '../types/context.js';
import { postObjectType } from '../query/postQuery.js';
import { UUIDType } from '../types/uuid.js';

interface ICreatePost {
  dto: {
    title: string;
    content: string;
    authorId: string;
  };
}

const createPostObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(UUIDType),
    },
    content: {
      type: new GraphQLNonNull(UUIDType),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  }),
});

export const createPost = {
  createPost: {
    type: postObjectType as GraphQLObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(createPostObjectType),
      },
    },
    resolve: async (_source, args: ICreatePost, context: IContext) => {
      return await context.prisma.post.create({
        data: args.dto,
      });
    },
  },
};
