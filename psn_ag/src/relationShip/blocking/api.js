import { RESTDataSource } from '@apollo/datasource-rest';
import { url, entryPoint, port } from '../server';
import { generalRequest } from '../../utilities';
import { GraphQLError } from 'graphql'

export class BlockingAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async findAllBlockedUsers(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const ids = await generalRequest(`${this.baseURL}/blocked`, 'GET', null, {"idO": user.id});
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

    async blockUser(idD, contextValue) {
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

        const response = await generalRequest(`${this.baseURL}/block`, 'POST', null, {"idO": user.id, "idD": userD.id});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async unblockUser(idD, contextValue) {
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

        const response = await generalRequest(`${this.baseURL}/unblock`, 'PUT', null, {"idO": user.id, "idD": userD.id});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async isBlockedUserWithoutAuth(idO, idD){
        const response = await generalRequest(`${this.baseURL}/is-blocked`, 'GET', null, {"idO": idO, "idD": idD});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async isBlockedUser(idD, contextValue){
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }        

        const response = await generalRequest(`${this.baseURL}/is-blocked`, 'GET', null, {"idO": user.id, "idD": idD});
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