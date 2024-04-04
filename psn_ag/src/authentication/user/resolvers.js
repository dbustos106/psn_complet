const resolvers = {
	Query: {
		findAllUsers: (_, __, contextValue) => {
			return contextValue.dataSources.userAPI.findAllUsers();
		},
		findUserById: (_, {id}, contextValue) => {
			return contextValue.dataSources.userAPI.findUserById(id, contextValue);
		},
		searchUser: (_, {pattern}, contextValue) => {
			return contextValue.dataSources.userAPI.searchUser(pattern);
		},
		sendEmailToChangePassword: (_, email, contextValue) => {
			return contextValue.dataSources.userAPI.sendEmailToChangePassword(email);
		},
		getProfilePicture: (_, { ids }, contextValue) => {
			return contextValue.dataSources.userAPI.getProfilePicture(ids);
		},
	},
	Mutation: {
		registerUser: (_, {user}, contextValue) => {
			return contextValue.dataSources.userAPI.registerUser(user, contextValue);
		},
		verifyAccount: (_, {id, code}, contextValue) => {
			return contextValue.dataSources.userAPI.verifyAccount(id, code);
		},
		editUserById: (_, {id, user}, contextValue) => {
			return contextValue.dataSources.userAPI.editUserById(id, user);
		},
    	deleteUserById: (_, {id}, contextValue) => {
			return contextValue.dataSources.userAPI.deleteUserById(id);
		},
		changePassword: (_, {id, code, newPassword}, contextValue) => {
			return contextValue.dataSources.userAPI.changePassword(id, code, newPassword);
		},
		changeProfilePicture: (_, __, contextValue) => {
			return contextValue.dataSources.userAPI.changeProfilePicture(contextValue);
		},
	},
};

export default resolvers;
