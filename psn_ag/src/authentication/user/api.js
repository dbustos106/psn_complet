import { RESTDataSource } from '@apollo/datasource-rest';
import { formToUrlEncoded, generalRequest, addParams, generate_signed_url } from '../../utilities';
import { url, port, entryPoint } from './server';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv'

export class UserAPI extends RESTDataSource {
    
    constructor(options){
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
        dotenv.config();
    }

    async registerUser(user, contextValue){
		const response1 = await generalRequest(`${this.baseURL}/register`, 'POST', null, user);
        if(response1.statusCode != null){
            throw new GraphQLError(response1.error.message, {
                extensions: {
                  status: response1.statusCode,
                },
            });
        }

        const response2 = await contextValue.dataSources.relationShipAPI.createNode(response1.id);
        if(response2.statusCode != null){
            throw new GraphQLError(response2.error.message, {
                extensions: {
                  status: response2.statusCode,
                },
            });
        }

        return response1.message;
    }

    async verifyAccount(id, code){
		const response = await generalRequest(addParams(`${this.baseURL}/verifyAccount/${id}`, {"code": code}), 'PUT');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message;   
    }

    async sendEmailToChangePassword(email){
		const response = await generalRequest(addParams(`${this.baseURL}/changePassword/sendEmail`, email), 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message;
    }

    async changePassword(id, code, newPassword){
		const response = await generalRequest(addParams(`${this.baseURL}/changePassword/${id}`, {"code": code}), 'PUT', {'Content-Type': 'application/x-www-form-urlencoded'}, formToUrlEncoded({"password": newPassword}));
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message;
    }

    async findAllUsers(){
		const response = await generalRequest(`${this.baseURL}/all`, 'GET', {'Content-Type': 'application/json', 'Authorization': this.authHeader});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message.content;
    }

    async findUserById(id, contextValue){
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        if(await contextValue.dataSources.blockingAPI.isBlockedUserWithoutAuth(user.id, id)){   
            throw new GraphQLError("User blocked", {
                extensions: {
                  status: 403,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/${id}`, 'GET', {'Content-Type': 'application/json', 'Authorization': this.authHeader});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message;
    }

    async findUserByIdWithoutAuth(id){
        const response = await generalRequest(`${this.baseURL}/${id}`, 'GET', {'Content-Type': 'application/json', 'Authorization': this.authHeader});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message;
    }

    async findUsersByIds(ids){
        const route = addParams(`${this.baseURL}/ids`, ids);
        const response = await generalRequest(route, 'GET', {'Content-Type': 'application/json', 'Authorization': this.authHeader});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message.content;
    }

    async searchUser(pattern){
        const response = await generalRequest(`${this.baseURL}/pattern/${pattern}`, 'GET', {'Content-Type': 'application/json', 'Authorization': this.authHeader});
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message.content;
    }
		
    async editUserById(id, user){
		const response = await generalRequest(`${this.baseURL}/${id}`, 'PUT', {'Content-Type': 'application/json', 'Authorization': this.authHeader}, user);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response.message;
    }

    async deleteUserById(id){
		const response1 = await generalRequest(`${this.baseURL}/${id}`, 'DELETE', {'Content-Type': 'application/json', 'Authorization': this.authHeader});
        if(response1.statusCode != null){
            throw new GraphQLError(response1.error.message, {
                extensions: {
                  status: response1.statusCode,
                },
            });
        }

        const response2 = await contextValue.dataSources.relationShipAPI.deleteNode(response1.id);
        if(response2.statusCode != null){
            throw new GraphQLError(response2.error.message, {
                extensions: {
                  status: response2.statusCode,
                },
            });
        }
        return response1.message;
    }

    async changeProfilePicture(contextValue){
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const signedurl = generate_signed_url(process.env.SERVICE_ACCOUNT_FILE, 
            process.env.BUCKET_NAME, "Profile-pictures/" + user.id + ".png", undefined, undefined, "POST");
        return signedurl;
    }

    async getProfilePicture(ids){
        const signedUrls = []
        for(let id of ids){
            const signedUrl = generate_signed_url(process.env.SERVICE_ACCOUNT_FILE, 
                process.env.BUCKET_NAME, "Profile-pictures/" + id + ".png");
            signedUrls.push(signedUrl);
        }
        return signedUrls;
    }

}
