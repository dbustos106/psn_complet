const resolvers = {
    Query: {
        findAllReactions: (_, __, contextValue) => {
            return contextValue.dataSources.reactionAPI.findAllReactions(contextValue);
        },
    },
    Mutation: {
        reactToPost: (_, {reactToPost}, contextValue) => {
            return contextValue.dataSources.reactionAPI.reactToPost(reactToPost, contextValue);
        },
        reactToComment: (_, {reactToComment}, contextValue) => {
            return contextValue.dataSources.reactionAPI.reactToComment(reactToComment, contextValue);
        },
        deleteReaction: (_, {reactId}, contextValue) => {
            return contextValue.dataSources.reactionAPI.deleteReaction(reactId, contextValue);
        },
        upadateReaction: (_, {reactId, reaction}, contextValue) => {
            return contextValue.dataSources.reactionAPI.upadateReaction(reactId, reaction, contextValue);
        },
    },
};

export default resolvers;