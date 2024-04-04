export const conversationTypeDef = `
  scalar Date
  type Conversation {
    _id: ID!,
    membersId: [Int]!, 
    createDate: Date!, 
    updateDate: Date, 
    memberToName: String,
  }

  type ConversationResponse {
    statusCode: Int!,
    message: String!,
    conversations: [Conversation]
  }
`;
  
export const conversationQueries = `
  getConversationsByUser: [Conversation]!
`;

export const conversationMutations = `
  createConversation(memberToId: Int!): Conversation!
  deleteConversationByUser(conversationId: String!): Conversation!
`;