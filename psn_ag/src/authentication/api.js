import { RESTDataSource } from '@apollo/datasource-rest';
import { generalRequest, formToUrlEncoded } from '../utilities';
import { url, port, entryPoint } from './server';
import { GraphQLError } from 'graphql'

export class AuthAPI extends RESTDataSource {
    
    constructor(options){
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async login(credentials){
        const response = await generalRequest(`${this.baseURL}/login`, 'POST', {'Content-Type': 'application/x-www-form-urlencoded'}, formToUrlEncoded(credentials));
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async authenticate(){
        const response = await generalRequest(`${this.baseURL}/authenticate`, 'POST', {'Content-Type': 'application/json', 'Authorization': this.authHeader});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async refreshToken(){ 
		const response = await generalRequest(`${this.baseURL}/refreshToken`, 'POST', {'Authorization': this.authHeader});
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
