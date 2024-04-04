export const blockingQueries = `
  findAllBlockedUsers: [UserPreview]!
  isBlockedUser(idD: Int): Boolean!
`;

export const blockingMutations = `
  blockUser(idD: Int!): [String]!
  unblockUser(idD: Int!): [String]!
`;