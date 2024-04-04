import { RESTDataSource } from '@apollo/datasource-rest';
import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
import { GraphQLError } from 'graphql'

export class CommentAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async findAllCommentsPost( idPost, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/allComments/${idPost}`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async findCommentById(idComment, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/${idComment}`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async commentsThreadFromPost(idPost, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                    status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/commentsThread/${idPost}`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                    status: response.statusCode,
                },
            });
        }

        let ownerIds = []
        response.forEach(comment => {
            ownerIds.unshift(comment.ownerId);
            let ownerSubIds = [];
            ownerSubIds = comment.commentThread.map(commentSub => commentSub.ownerId);
            ownerIds = [...ownerIds, ...ownerSubIds];
        });

        const users = await contextValue.dataSources.userAPI.findUsersByIds({"ids": ownerIds});

        let commentInfos = []
        response.forEach(comment => {
            let owner = users.find(user => user.id == comment.ownerId);
            if(owner != null){
                let commentSubInfos = [];
                comment.commentThread.forEach(commentSub => {
                    let ownerSub = users.find(user => user.id == commentSub.ownerId);
                    if(ownerSub != null){
                        let commentSubInfo = {
                            _id: commentSub._id,
                            parentCommentId: commentSub.parentCommentId,
                            createdDate: commentSub.createdDate,
                            updatedDate: commentSub.updatedDate,
                            ownerId: commentSub.ownerId,
                            description: commentSub.description,
                            content_elements: commentSub.content_elements,
                            reactions: commentSub.reactions,
                            reports: commentSub.reports,
                            memberToName: `${ownerSub.name} ${ownerSub.lastName}`}
                        commentSubInfos.push(commentSubInfo);
                    }
                });
                let commentInfo = {
                    _id: comment._id,
                    createdDate: comment.createdDate,
                    updatedDate: comment.updatedDate,
                    ownerId: comment.ownerId,
                    description: comment.description,
                    content_elements: comment.content_elements,
                    reactions: comment.reactions,
                    reports: comment.reports,
                    commentThread: commentSubInfos,
                    memberToName: `${owner.name} ${owner.lastName}`}
                commentInfos.push(commentInfo);
            }
        });
        return commentInfos;
    }

    
    async createComment(comment, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        comment["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/`, 'POST', null, comment);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async createCommentToComment(comment, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                    status: user.statusCode,
                },
            });
        }

        comment["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/commentToComment`, 'POST', null, comment);
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                    status: response.statusCode,
                },
            });
        }
        return response;
    }

    async deleteComment(idComment, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const response = await generalRequest(`${this.baseURL}/${idComment}`, 'DELETE');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }
    
    async updateComment(idComment, comment, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
        
        comment["ownerId"] = user.id;
        const response = await generalRequest(`${this.baseURL}/${idComment}`, 'PUT', null, comment);
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
