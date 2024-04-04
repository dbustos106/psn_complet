export const authenticationTypeDef = `
  type Tokens {
    access_token: String!
    refresh_token: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }`;

export const authenticationMutations = `
  refreshToken: Tokens  
  authenticate: User!
  login(credentials: CredentialsInput!): Tokens
`;
