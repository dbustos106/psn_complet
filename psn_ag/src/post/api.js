import { RESTDataSource } from '@apollo/datasource-rest';
import { generalRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import { GraphQLError } from 'graphql'

export class PostAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async findAllPost(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/postInfo`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }

        const ownerIds = response.map(post => post.ownerId);
        const users = await contextValue.dataSources.userAPI.findUsersByIds({"ids": ownerIds});
        
        let postInfos = []
        response.forEach(post => {
            let owner = users.find(user => user.id == post.ownerId);
            if(owner != null){
                let postInfo = {_id: post._id,
                    createdDate: post.createdDate,
                    updatedDate: post.updatedDate,
                    ownerId: post.ownerId,
                    location: post.location,
                    description: post.description,
                    contentElement: post.contentElement,
                    num_comments: post.num_comments,
                    num_reactions: post.num_reactions,
                    memberToName: `${owner.name} ${owner.lastName}`}
                postInfos.push(postInfo);
            }
        });
        return postInfos;
    }

    async createPost(post, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
        
        post["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/`, 'POST', null, post);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async createPostShared(post, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
        
        post["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/`, 'POST', null, post);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                    status: response.statusCode,
                },
            });
        }
        return response;
    }

    async findPostById(idPost, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/${idPost}`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async findPostsByOwnerId(ownerId, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/findPostsByOwner/${ownerId}`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                    status: response.statusCode,
                },
            });
        }
        return response;
    }

    async findWelcomePost() {
        const idPost = "6475c588d45c0424d5feb0db"; //id del post de bienvenida
        const response = await generalRequest(`${this.baseURL}/${idPost}`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }
        
    async updatePost(post, contextValue, idPost) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
        
        post["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/${idPost}`, 'PUT', null, post);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async deletePost(contextValue, idPost) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
        
        const response = await generalRequest(`${this.baseURL}/${idPost}`, 'DELETE', null);
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