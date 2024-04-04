const resolvers = {
    Query: {
        // faltan consultas
    },
    Mutation: {
        addContentToPost: (_, {contentElementPost}, contextValue) => {
            return contextValue.dataSources.contentElementAPI.addContentToPost(contentElementPost, contextValue);
        },
        addContentToComment: (_, {contentElementComment}, contextValue) => {
            return contextValue.dataSources.contentElementAPI.addContentToComment(contentElementComment, contextValue);
        },
        deleteContentElement: (_, {contentElementId}, contextValue) => {
            return contextValue.dataSources.contentElementAPI.deleteContentElement(contentElementId, contextValue);
        }
    },
};

export default resolvers;