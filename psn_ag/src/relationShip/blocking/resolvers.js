const resolvers = {
    Query: {
        findAllBlockedUsers: (_, __, contextValue) => {
            return contextValue.dataSources.blockingAPI.findAllBlockedUsers(contextValue);
        },
        isBlockedUser: (_, { idD }, contextValue) => {
            return contextValue.dataSources.blockingAPI.isBlockedUser(idD, contextValue);
        }
    },
    Mutation: {
        blockUser: (_, { idD }, contextValue) => {
            return contextValue.dataSources.blockingAPI.blockUser(idD, contextValue);
        },
        unblockUser: (_, { idD }, contextValue) => {
            return contextValue.dataSources.blockingAPI.unblockUser(idD, contextValue);
        }
    },
};

export default resolvers;