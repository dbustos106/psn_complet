export const postTypeDef = `
  type Post {
    _id: String
    createdDate: Date
    updatedDate: Date
    ownerId: Int
    location: String
    description: String
  }

  type PostShared {
    _id: String
    idOriginalPost: String
    createdDate: Date
    updatedDate: Date
    ownerId: Int
    location: String
    description: String
  }

  type PostInfo {
    _id: String
    createdDate: Date
    updatedDate: Date
    ownerId: Int
    location: String
    description: String
    contentElement: [ContentElement]
    num_comments: Int
    num_reactions: Int
    memberToName: String
  }

  type PostAllInfo {
    _id: String
    createdDate: Date
    updatedDate: Date
    ownerId: Int
    location: String
    description: String
    contentElement: [ContentElement]
    comments: [Comment]
    reactions: [Reaction]
    reports: [Report]
  }
  
  input PostInput {
    location: String
    description: String!
  }

  input PostSharedInput {
    idOriginalPost: String!
    location: String
    description: String!
  }

  type response {
    message: String
  }
`;

export const postQueries = `
  findAllPost: [PostInfo]!
  findPostById(idPost: String!): PostAllInfo!
  findPostsByOwnerId(ownerId: Int!): [PostAllInfo]!
  findWelcomePost: PostAllInfo!
`;

export const postMutations = `
  createPost(post: PostInput!): Post!
  createPostShared(post: PostSharedInput!): PostShared!
  updatePost(idPost: String!, post: PostInput!): Post!
  deletePost(idPost: String!): response!
`;