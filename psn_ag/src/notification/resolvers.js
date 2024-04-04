const resolvers = {
	Query: {
		getNotificationsByUser: (_, body, contextValue) => 
			contextValue.dataSources.notificationAPI.getNotificationsByUser(contextValue),
	}, 

	Mutation: {
		createNotification: (_, body, contextValue) => 
			contextValue.dataSources.notificationAPI.createNotification(body, contextValue),
	},
};

export default resolvers;

