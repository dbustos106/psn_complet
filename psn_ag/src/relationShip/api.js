import { RESTDataSource } from '@apollo/datasource-rest';
import { url, entryPoint, port } from './server';
import { generalRequest } from '../utilities';
import { GraphQLError } from 'graphql'

export class RelationShipAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async createNode(idO) {
        const response = await generalRequest(`${this.baseURL}/create`, 'POST', null, {"idO": idO});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async deleteNode(idO) {
        const response = await generalRequest(`${this.baseURL}/delete`, 'DELETE', null, {"idO": idO});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async getRelationsToUser(idD, contextValue){
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
        
        const response = await generalRequest(`${this.baseURL}/relations`, 'GET', null, {"idO": user.id, "idD": idD});
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