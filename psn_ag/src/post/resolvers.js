const resolvers = {
    Query: {
        findAllPost: (_, __, contextValue) => {
            return contextValue.dataSources.postAPI.findAllPost(contextValue);
        },
        findPostById: (_, { idPost }, contextValue) => {
            return contextValue.dataSources.postAPI.findPostById(idPost, contextValue);
        },
        findPostsByOwnerId: (_, { ownerId }, contextValue) => {
            return contextValue.dataSources.postAPI.findPostsByOwnerId(ownerId, contextValue);
        },
        findWelcomePost: (_, __, contextValue) => {
            return contextValue.dataSources.postAPI.findWelcomePost();
        }
    },
    Mutation: {
        createPost: (_, { post }, contextValue) => {
            return contextValue.dataSources.postAPI.createPost(post, contextValue);
        },
        updatePost: (_, { idPost, post }, contextValue) => {
            return contextValue.dataSources.postAPI.updatePost(post, contextValue, idPost);
        },
        deletePost: (_, { idPost }, contextValue) => {
            return contextValue.dataSources.postAPI.deletePost(contextValue, idPost);
        },
        createPostShared: (_, { post }, contextValue) => {
            return contextValue.dataSources.postAPI.createPostShared(post, contextValue);
        }
    },
};

export default resolvers;