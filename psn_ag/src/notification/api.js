import { RESTDataSource } from '@apollo/datasource-rest';
import { generalRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import { GraphQLError } from 'graphql'

export class NotificationAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async createNotification(createNotificationInput, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                    status: user.statusCode,
                },
            });
        }

        const createNotificationTransfer = {
            actorId: user.id, 
            actorName: user.name || 'An user',
            notifierId: createNotificationInput.createNotificationInput.notifierId,
            type: createNotificationInput.createNotificationInput.type,
        }
      
        const response = await generalRequest(`${this.baseURL}`, 'POST', {}, createNotificationTransfer);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }

        return response;
    }

    async createNotificationWithoutAuth(user, createNotificationInput) {
        const createNotificationTransfer = {
            actorId: user.id, 
            actorName: user.name || 'An user',
            notifierId: createNotificationInput.createNotificationInput.notifierId,
            type: createNotificationInput.createNotificationInput.type,
        }
      
        const response = await generalRequest(`${this.baseURL}`, 'POST', {}, createNotificationTransfer);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }

        return response;
    }

    async getNotificationsByUser(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                    status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/user/${user.id}`, 'GET'); 
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
