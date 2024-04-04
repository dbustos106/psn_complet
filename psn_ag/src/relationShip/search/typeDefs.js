export const searchQueries = `
  findAllSearchedUsers: [UserPreview]!
  findAllSuggestedFriends: [UserPreview]!
`;

export const searchMutations = `
  searchUser(idD: Int!): [String]!
  deleteRecentSearchedUsers: [String]!
`;