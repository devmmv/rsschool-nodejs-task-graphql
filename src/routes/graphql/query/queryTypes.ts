import { GraphQLObjectType } from 'graphql';
import { memberQuery } from './memberQuery.js';
import { postQuery } from './postQuery.js';
import { profileQuery } from './profileQuery.js';
import { userQuery } from './userQuery.js';

export const queryTypes = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...memberQuery,
    ...postQuery,
    ...profileQuery,
    ...userQuery,
  }),
});
