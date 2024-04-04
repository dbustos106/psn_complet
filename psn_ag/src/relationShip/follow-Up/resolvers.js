const resolvers = {
    Query: {
        findAllFollowedUsers: (_, __, contextValue) => {
            return contextValue.dataSources.followUpAPI.findAllFollowedUsers(contextValue);
        },
        findAllFollowRequests: (_, __, contextValue) => {
            return contextValue.dataSources.followUpAPI.findAllFollowRequests(contextValue);
        },
    },
    Mutation: {
        followUser: (_, { idD }, contextValue) => {
            return contextValue.dataSources.followUpAPI.followUser(idD, contextValue);
        },
        unfollowUser: (_, { idD }, contextValue) => {
            return contextValue.dataSources.followUpAPI.unfollowUser(idD, contextValue);
        },
        acceptFollow: (_, { idD }, contextValue) => {
            return contextValue.dataSources.followUpAPI.acceptFollow(idD, contextValue);
        },
        denyFollow: (_, { idD }, contextValue) => {
            return contextValue.dataSources.followUpAPI.denyFollow(idD, contextValue);
        },
    },
};

export default resolvers;