import { RESTDataSource } from '@apollo/datasource-rest';
import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
import { GraphQLError } from 'graphql'

export class ReportAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async reportPost(reportPost, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        reportPost['ownerId'] = user.id;
        const response = await generalRequest(`${this.baseURL}/addReportToPost`, 'POST', null, reportPost);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async reportComment(reportComment, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        reportPost['ownerId'] = user.id;
        const response = await generalRequest(`${this.baseURL}/addReportToComment`, 'POST', null, reportComment);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async deleteReport(idReport, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/${idReport}`, 'DELETE');
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
