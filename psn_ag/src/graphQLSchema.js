import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from '@graphql-tools/schema';

import {
    authenticationTypeDef,
    authenticationMutations
} from './authentication/typeDefs';

import {
    userTypeDef,
    userQueries,
    userMutations
} from './authentication/user/typeDefs';

import {
    postTypeDef,
    postQueries,
    postMutations
} from './post/typeDefs';

import{
    commentsTypeDef,
    commentsQueries,
    commentsMutations
} from './post/comment/typeDefs';

import {
    contentElementTypeDef,
    contentElementQueries,
    contentElementMutations
} from './post/contentElement/typeDefs';

import{
    reactionTypeDef,
    reactionQueries,
    reactionMutations
} from './post/reaction/typeDefs';

import{
    reportTypeDef,
    reportQueries,
    reportMutations
} from './post/report/typeDefs';

import {
    conversationTypeDef, 
    conversationQueries, 
    conversationMutations
} from './chat/conversation/typeDefs';

import {
    messageTypeDef,
    messageQueries
} from './chat/message/typeDefs';

import {
    notificationTypeDef,
    notificationQueries,
    notificationMutations,
} from './notification/typeDefs';

import{
    blockingQueries,
    blockingMutations
} from './relationShip/blocking/typeDefs'

import{
    followUpQueries,
    followUpMutations
} from './relationShip/follow-Up/typeDefs'

import{
    searchQueries,
    searchMutations
} from './relationShip/search/typeDefs'

import{
    relationShipTypeDef,
    relationShipQuery
} from './relationShip/typeDefs'

import authenticationResolvers from './authentication/resolvers';
import userResolvers from './authentication/user/resolvers';
import postResolvers from './post/resolvers';
import commentsResolvers from './post/comment/resolvers';
import contentElementResolvers from './post/contentElement/resolvers';
import reactionResolvers from './post/reaction/resolvers';
import reportResolvers from './post/report/resolvers';
import conversationResolvers from './chat/conversation/resolvers';
import messageResolvers from './chat/message/resolvers';
import notificationResolvers from './notification/resolvers';
import blockingResolvers from './relationShip/blocking/resolvers';
import followUpResolvers from './relationShip/follow-Up/resolvers';
import searchResolvers from './relationShip/search/resolvers';
import relationShipResolvers from './relationShip/resolvers';

import { mergeSchemas } from './utilities';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
    [
        'scalar JSON',
        authenticationTypeDef,
        userTypeDef,
        postTypeDef,
        commentsTypeDef,
        contentElementTypeDef,
        reactionTypeDef,
        reportTypeDef, 
        conversationTypeDef,
        messageTypeDef,
        notificationTypeDef,
        relationShipTypeDef,
    ], [
        userQueries,
        postQueries,
        commentsQueries,
        contentElementQueries,
        reactionQueries,
        reportQueries, 
        conversationQueries,
        messageQueries,
        notificationQueries,
        blockingQueries,
        followUpQueries,
        searchQueries,
        relationShipQuery,
    ], [
        authenticationMutations,
        userMutations,
        postMutations,
        commentsMutations,
        contentElementMutations,
        reactionMutations,
        reportMutations, 
        conversationMutations,
        notificationMutations,
        blockingMutations,
        followUpMutations,
        searchMutations,
    ],

);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: merge({ JSON: GraphQLJSON }, // allows scalar JSON
        authenticationResolvers,
        userResolvers,
        postResolvers,
        commentsResolvers,
        contentElementResolvers,
        reactionResolvers,
        reportResolvers, 
        conversationResolvers,
        messageResolvers,
        notificationResolvers,
        blockingResolvers,
        followUpResolvers,
        searchResolvers,
        relationShipResolvers,
    )
});