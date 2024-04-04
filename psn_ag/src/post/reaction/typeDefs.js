export const reactionTypeDef = `
  type Reaction{
    _id: String
    postId: String
    commentId: String
    type: String!
    ownerId: Int!
    createdDate: Date!
    updatedDate: Date!
  }

  input ReactToPostInput {
    postId: String!
    type: String!
  }

  input ReactToCommentInput {
    commentId: String!
    type: String!
  }

  input UpdateReactionInput {
    type: String!
  } 
`;

export const reactionQueries = `
  findAllReactions: [Reaction]
`;

export const reactionMutations = `
  reactToPost(reactToPost: ReactToPostInput!): Reaction!
  reactToComment(reactToComment: ReactToCommentInput!): Reaction!
  deleteReaction(reactId: String): String!
  upadateReaction(reactId: String, reaction: UpdateReactionInput!): Reaction!
`;
