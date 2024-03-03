import { GraphQLObjectType } from 'graphql';
import { createUser } from './createUser.js';
import { changeUser } from './changeUser.js';
import { deleteUser } from './deleteUser.js';
import { createPost } from './createPost.js';
import { changePost } from './changePost.js';
import { subscribeTo } from './subscribeTo.js';
import { deletePost } from './deletePost.js';
import { createProfile } from './createProfile.js';
import { changeProfile } from './changeProfile.js';
import { deleteProfile } from './deleteProfile.js';
import { unsubscribeFrom } from './unsubscribeFrom.js';

export const mutationTypes = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...createUser,
    ...changeUser,
    ...deleteUser,
    ...createPost,
    ...changePost,
    ...deletePost,
    ...createProfile,
    ...changeProfile,
    ...deleteProfile,
    ...subscribeTo,
    ...unsubscribeFrom,
  }),
});
