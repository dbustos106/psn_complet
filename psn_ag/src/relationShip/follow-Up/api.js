import { RESTDataSource } from '@apollo/datasource-rest';
import { url, entryPoint, port } from '../server';
import { generalRequest } from '../../utilities';
import { GraphQLError } from 'graphql'

export class FollowUpAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async findAllFollowedUsers(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const ids = await generalRequest(`${this.baseURL}/followed`, 'GET', null, {"idO": user.id});
        if(ids.statusCode != null){
            throw new GraphQLError(ids.error.message, {
                extensions: {
                  status: ids.statusCode,
                },
            });
        }

        const response = contextValue.dataSources.userAPI.findUsersByIds({"ids":ids});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async findAllFollowRequests(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
                
        const ids = await generalRequest(`${this.baseURL}/requests`, 'GET', null, {"idO": user.id});
        if(ids.statusCode != null){
            throw new GraphQLError(ids.error.message, {
                extensions: {
                  status: ids.statusCode,
                },
            });
        }

        const response = contextValue.dataSources.userAPI.findUsersByIds({"ids":ids});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async followUser(idD, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
            
        const userD = await contextValue.dataSources.userAPI.findUserByIdWithoutAuth(idD);
        if(userD.statusCode != null){
            throw new GraphQLError(userD.error.message, {
                extensions: {
                  status: userD.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/follow`, 'POST', null, {"idO": user.id, "idD": userD.id});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        
        await contextValue.dataSources.notificationAPI.createNotificationWithoutAuth(user, {"createNotificationInput": {"notifierId": userD.id, "type": "FRIEND_REQUEST"}});
        return response;
    }

    async acceptFollow(idD, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const userD = await contextValue.dataSources.userAPI.findUserByIdWithoutAuth(idD);
        if(userD.statusCode != null){
            throw new GraphQLError(userD.error.message, {
                extensions: {
                  status: userD.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/afollow`, 'PUT', null, {"idO": user.id, "idD": userD.id});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        
        await contextValue.dataSources.notificationAPI.createNotificationWithoutAuth(user, {"createNotificationInput": {"notifierId": userD.id, "type": "FRIEND_CONFIRMATION"}});
        return response;
    }

    async denyFollow(idD, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const userD = await contextValue.dataSources.userAPI.findUserByIdWithoutAuth(idD);
        if(userD.statusCode != null){
            throw new GraphQLError(userD.error.message, {
                extensions: {
                  status: userD.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/dfollow`, 'PUT', null, {"idO": user.id, "idD": userD.id});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async unfollowUser(idD, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const userD = await contextValue.dataSources.userAPI.findUserByIdWithoutAuth(idD);
        if(userD.statusCode != null){
            throw new GraphQLError(userD.error.message, {
                extensions: {
                  status: userD.statusCode,
                },
            });
        }
                
        const response = await generalRequest(`${this.baseURL}/unfollow`, 'PUT', null, {"idO": user.id, "idD": userD.id});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }
}