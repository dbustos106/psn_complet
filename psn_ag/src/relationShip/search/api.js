import { RESTDataSource } from '@apollo/datasource-rest';
import { url, entryPoint, port } from '../server';
import { generalRequest } from '../../utilities';
import { GraphQLError } from 'graphql'

export class SearchAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async findAllSearchedUsers(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
        
        const ids = await generalRequest(`${this.baseURL}/recent-searched`, 'GET', null, {"idO": user.id});
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

    async findAllSuggestedFriends(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const ids = await generalRequest(`${this.baseURL}/suggested`, 'GET', null, {"idO": user.id});
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

    async searchUser(idD, contextValue) {  
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

        const response = await generalRequest(`${this.baseURL}/search`, 'POST', null, {"idO": user.id, "idD": userD.id});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async deleteRecentSearchedUsers(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/recent-searched`, 'DELETE', null, {"idO": user.id});
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