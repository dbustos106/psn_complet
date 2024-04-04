const resolvers = {
        Query: {
            // faltan consultas
        },
        Mutation: {
            reportPost(_, { reportPost }, contextValue) {
                return contextValue.dataSources.reportAPI.reportPost(reportPost, contextValue);
            },
            reportComment(_, { reportComment }, contextValue) {
                return contextValue.dataSources.reportAPI.reportComment(reportComment, contextValue);
            },
            deleteReport(_, { idReport }, contextValue) {
                return contextValue.dataSources.reportAPI.deleteReport(idReport, contextValue);
            },
        },

};

export default resolvers;