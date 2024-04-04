export const followUpQueries = `
  findAllFollowedUsers: [UserPreview]!
  findAllFollowRequests: [UserPreview]!
`;

export const followUpMutations = `
  followUser(idD: Int!): [String]!
  unfollowUser(idD: Int!): [String]!
  acceptFollow(idD: Int!): [String]!
  denyFollow(idD: Int!): [String]!
`;