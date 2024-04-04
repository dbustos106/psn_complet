export const messageTypeDef = `
  scalar Date
  type Message {
    _id: ID!
    userId: Int!,
    conversationId: String!,
    content: String!,
    active: Boolean!, 
    createDate: Date!, 
    updateDate: Date
  }

  type MessageResponse {
    statusCode: Int!,
    message: String!,
    messages: [Message]
  }
`;
  
export const messageQueries = `
  getMessagesByConversation(conversationId: String!): [Message]!
`;
