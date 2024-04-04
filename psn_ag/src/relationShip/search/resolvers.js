const resolvers = {
    Query: {
        findAllSearchedUsers: (_, __, contextValue) => {
            return contextValue.dataSources.searchAPI.findAllSearchedUsers(contextValue);
        },
        findAllSuggestedFriends: (_, __, contextValue) => {
            return contextValue.dataSources.searchAPI.findAllSuggestedFriends(contextValue);
        }
    },
    Mutation: {
        searchUser: (_, { idD }, contextValue) => {
            return contextValue.dataSources.searchAPI.searchUser(idD, contextValue);
        },
        deleteRecentSearchedUsers: (_, __, contextValue) => {
            return contextValue.dataSources.searchAPI.deleteRecentSearchedUsers(contextValue);
        }
    },
};

export default resolvers;