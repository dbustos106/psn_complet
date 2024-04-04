export const contentElementTypeDef = `

  type ContentElement{
    _id: String!
    postId: String
    commentId: String
    description: String!
    mediaType: String!
    mediaLocator: String!
  }

  type ContentElementPost {
    _id: String!
    postId: String
    description: String!
    mediaType: String!
    mediaLocator: String!
  }

  type ContentElementComment {
    _id: String!
    commentId: String!
    description: String!
    mediaType: String!
    mediaLocator: String!
  }

  input addContentToPostInput {
    postId: String!
    description: String!
    mediaType: String!
    mediaLocator: String!
  }

  input addContentToCommentInput {
    commentId: String!
    description: String!
    mediaType: String!
    mediaLocator: String!
  }
`;

export const contentElementQueries = `
`;

export const contentElementMutations = `
  addContentToPost(contentElementPost: addContentToPostInput!): ContentElementPost!
  addContentToComment(contentElementComment: addContentToCommentInput!): ContentElementComment!
  deleteContentElement(contentElementId: String!): response!
`;
 