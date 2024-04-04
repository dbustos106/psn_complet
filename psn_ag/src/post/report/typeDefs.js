export const reportTypeDef = `
  type Report {
    _id: String
    ownerId: Int
    postId: String
    commentId: String
    infraction: String!
    description: String!
    updatedDate: Date!
    cretedDate: Date!
  }

  input ReportPostInput {
    postId: String!
    infraction: String!
    description: String!
  }

  input ReportCommentInput {
    commentId: String!
    infraction: String!
    description: String!
  }
`;

export const reportQueries = `
  `;

export const reportMutations = `
  reportPost(reportPost: ReportPostInput!): Report!
  reportComment(reportComment: ReportCommentInput!): Report!
  deleteReport(idReport: String): response!
`;