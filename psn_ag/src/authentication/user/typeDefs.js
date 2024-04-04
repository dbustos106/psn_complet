export const userTypeDef = `
  type User {
    id: Int!
    role: String!
    email: String!
    name: String!
    lastName: String!
    phoneNumber: String!
    notificationsEnable: Boolean!
    profileUpdateDate: String!
    profileType: String!
    enabled: Boolean!
    accountNonLocked: Boolean! 
  }

  input UserInput {
    email: String!
    password: String
    name: String!
    lastName: String!
    phoneNumber: String!
    notificationsEnable: Boolean!
    profileType: String!
  }`;

export const userQueries = `
  findAllUsers: [User]!
  findUserById(id: Int): User!
  searchUser(pattern: String!): [User]!
  sendEmailToChangePassword(email: String!): String!
  getProfilePicture(ids: [Int!]!): [String!]!
`;

export const userMutations = `
  registerUser(user: UserInput!): String!
  verifyAccount(id: Int!, code: String!): String!
  editUserById(id: Int!, user: UserInput!): String!
  deleteUserById(id: Int!): String! 
  changePassword(id: Int!, code: String!, newPassword: String!): String!
  changeProfilePicture: String!
`;
