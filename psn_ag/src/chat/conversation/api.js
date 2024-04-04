import { RESTDataSource } from '@apollo/datasource-rest';
import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from '../server';
import { GraphQLError } from 'graphql'

export class ConversationAPI extends RESTDataSource {

    constructor(options) {
        super(options);
        this.authHeader = options.req.headers.authorization;
        this.baseURL = `http://${url}:${port}/${entryPoint}`;
    }

    async createConversation(createConversationInput, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
      
        if(await contextValue.dataSources.blockingAPI.isBlockedUserWithoutAuth(user.id, createConversationInput.memberToId)){   
            throw new GraphQLError("User blocked", {
                extensions: {
                  status: 403,
                },
            });
        }

        const userTo = await contextValue.dataSources.userAPI.findUserByIdWithoutAuth(createConversationInput.memberToId);
        if(userTo.statusCode != null){
            throw new GraphQLError(userTo.error.message, {
                extensions: {
                  status: userTo.statusCode,
                },
            });
        }

        const membersId = [user.id, userTo.id]; 
        const response = await generalRequest(`${this.baseURL}`, 'POST', {}, {membersId}); 
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        return response;
    }

    async getConversationsByUser(contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }
        
        const userId = user.id; 
        const response = await generalRequest(`${this.baseURL}/user/${userId}`, 'GET');
        if(response.statusCode != null){
            throw new GraphQLError(response.error.message, {
                extensions: {
                  status: response.statusCode,
                },
            });
        }
        
        const memberToIds = response.map(conversation => {
            const foundMemberId = conversation.membersId.find(memberId => memberId != userId);
            return foundMemberId? foundMemberId: -1;
        });
        const users = await contextValue.dataSources.userAPI.findUsersByIds({"ids": memberToIds});

        let i = 0;
        let conversationInfos = []
        response.forEach(conversation => {
            let member = users.find(user => user.id == memberToIds[i]);
            if(member != null){
                let conversationInfo = {_id: conversation._id,
                    membersId: conversation.membersId,
                    createDate: conversation.createDate,
                    updateDate: conversation.updateDate,
                    memberToName: `${member.name} ${member.lastName}`}
                conversationInfos.push(conversationInfo);
            }else{
                let conversationInfo = {_id: conversation._id,
                    membersId: conversation.membersId, 
                    createDate: conversation.createDate, 
                    updateDate: conversation.updateDate,
                    memberToName: 'An user'}
                conversationInfos.push(conversationInfo);    
            } 
            i = i + 1;
        });
        return conversationInfos;
    }

    async deleteConversationByUser(deleteUserFromConversationInput, contextValue) {
        const user = await contextValue.dataSources.authAPI.authenticate();
        if(user.statusCode != null){
            throw new GraphQLError(user.error.message, {
                extensions: {
                  status: user.statusCode,
                },
            });
        }

        const userId = user.id; 
        const response = await generalRequest(`${this.baseURL}/${deleteUserFromConversationInput.conversationId}/user/${userId}/member/${userId}`, 'DELETE'); 
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