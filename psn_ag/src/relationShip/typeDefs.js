export const relationShipTypeDef = `
  type UserPreview {
    id: Int
    name: String!
    lastName: String!
  }

  type Relation {
    idO: Int!
    name: String!
  }
`;

export const relationShipQuery = `
  getRelationsToUser(idD: Int): [Relation]
`;
