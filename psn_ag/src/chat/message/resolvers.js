const resolvers = {
	Query: {
		getMessagesByConversation: (_, body, contextValue) => {
			return contextValue.dataSources.messageAPI.getMessagesByConversation(body, contextValue);
		}
	}, 
};

export default resolvers;

