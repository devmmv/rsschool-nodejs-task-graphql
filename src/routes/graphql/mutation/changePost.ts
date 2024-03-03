import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import IContext from '../types/context.js';
import { postObjectType } from '../query/postQuery.js';
import { UUIDType } from '../types/uuid.js';

interface IChangePost {
  id: string;
  dto: {
    title: string;
    content: string;
  };
}

const changePostObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {
      type: UUIDType,
    },
    content: {
      type: UUIDType,
    },
  }),
});

export const changePost = {
  changePost: {
    type: postObjectType as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(changePostObjectType),
      },
    },
    resolve: async (_source, args: IChangePost, context: IContext) => {
      return await context.prisma.post.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};