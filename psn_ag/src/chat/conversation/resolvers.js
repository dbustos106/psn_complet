const resolvers = {
	Query: {
		getConversationsByUser: (_, __, contextValue) => {
			return contextValue.dataSources.conversationAPI.getConversationsByUser(contextValue);
		},
	}, 
	Mutation: {
		createConversation: (_, body, contextValue) => {
			return contextValue.dataSources.conversationAPI.createConversation(body, contextValue);
		},
		deleteConversationByUser: (_, body, contextValue) => {
			return contextValue.dataSources.conversationAPI.deleteConversationByUser(body, contextValue);
		}
	},
};

export default resolvers;

