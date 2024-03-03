import { GraphQLObjectType } from 'graphql';
import { createUser } from './createUser.js';
import { changeUser } from './changeUser.js';
import { subscribeTo } from './subscribeTo.js';
import { unsubscribeFrom } from './unsubscribeFrom.js';

export const mutationTypes = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...createUser,
    ...changeUser,
    ...subscribeTo,
    ...unsubscribeFrom,
  }),
});
