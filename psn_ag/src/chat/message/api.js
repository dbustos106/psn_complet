import { RESTDataSource } from '@apollo/datasource-rest';
import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from '../server';
import { GraphQLError } from 'graphql'

export class MessageAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async getMessagesByConversation(getMessagesByConversationInput, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/${getMessagesByConversationInput.conversationId}/user/${user.id}/message`, 'GET'); 
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