const resolvers = {
    Query: {
        findCommentById: (_, { idComment }, contextValue) => {
            return contextValue.dataSources.commentAPI.findCommentById(idComment, contextValue);
        },
        commentsThreadFromPost: (_, { idPost }, contextValue) => {
            return contextValue.dataSources.commentAPI.commentsThreadFromPost(idPost, contextValue);
        },
    },
    Mutation: {
        createComment: (_, { comment }, contextValue) => {
            return contextValue.dataSources.commentAPI.createComment(comment, contextValue);
        },
        deleteComment: (_, { idComment }, contextValue) => {
            return contextValue.dataSources.commentAPI.deleteComment(idComment, contextValue);
        },
        updateComment: (_, { idComment, comment }, contextValue) => {
            return contextValue.dataSources.commentAPI.updateComment(idComment, comment, contextValue);
        },
        createCommentToComment: (_, { comment }, contextValue) => {
            return contextValue.dataSources.commentAPI.createCommentToComment(comment, contextValue);
        }
    },
};

export default resolvers;