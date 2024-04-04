export const commentsTypeDef = `
  type Comment {
    _id: String!
    createdDate: Date!
    updatedDate: Date!
    postId: String!
    ownerId: Int!
    description: String!
  }

  input commentToCommentInput {
    parentCommentId: String!
    description: String!
  }

  type commentToComment {
    _id: String!
    parentCommentId: String!
    createdDate: Date!
    updatedDate: Date!
    ownerId: Int!
    description: String!
  }

  type threads {
    _id: String
    parentCommentId: String
    createdDate: Date
    updatedDate: Date
    ownerId: Int
    description: String
    content_elements: [ContentElement]
    reactions: [Reaction]
    reports: [Report]
    memberToName: String
  }

  type CommentsThread {
    _id: String!
    createdDate: Date!
    updatedDate: Date!
    ownerId: Int!
    description: String!
    content_elements: [ContentElement]
    reactions: [Reaction]
    reports: [Report]
    commentThread: [threads]
    memberToName: String
  }

  input CommentInput {
    postId: String
    description: String!
  }

  input CommentUpdateInput {
    description: String!
  }
`;

export const commentsQueries = `
  findCommentById(idComment: String!): Comment!
  commentsThreadFromPost(idPost: String!): [CommentsThread]!
  
`;

export const commentsMutations = `
  createComment(comment: CommentInput!): Comment!
  updateComment(idComment: String!, comment: CommentUpdateInput!): Comment!
  deleteComment(idComment: String!): response!
  createCommentToComment(comment: commentToCommentInput!): commentToComment!
`;