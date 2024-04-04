const resolvers = {
	Mutation: {
		refreshToken: (_, __, contextValue) => {
			return contextValue.dataSources.authAPI.refreshToken();
		},
		login: (_, {credentials}, contextValue) => {
			return contextValue.dataSources.authAPI.login(credentials);
		},
		authenticate: (_, __, contextValue) => {
			return contextValue.dataSources.authAPI.authenticate();
		},
	},
};

export default resolvers;

