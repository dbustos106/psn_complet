const resolvers = {
    Query: {
        getRelationsToUser: (_, {idD}, contextValue) => {
            return contextValue.dataSources.relationShipAPI.getRelationsToUser(idD, contextValue);
        },
    },
};

export default resolvers;