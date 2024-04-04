import { RESTDataSource } from '@apollo/datasource-rest';
import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
import { GraphQLError } from 'graphql'

export class ReactionAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async findAllReactions(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async reactToPost(ReactToPostInput, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        ReactToPostInput["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/reactToPost`, 'POST', null, ReactToPostInput);
        console.log(response);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async reactToComment(ReactToCommentInput, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        ReactToCommentInput["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/reactToComment`, 'POST', null, ReactToCommentInput);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async deleteReaction(reactId, reaction ,contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/${reactId}`, 'DELETE', null, reaction);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async upadateReaction(reactId, reaction, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        reaction["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/${reactId}`, 'PUT', null, reaction);
        console.log(response);
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
