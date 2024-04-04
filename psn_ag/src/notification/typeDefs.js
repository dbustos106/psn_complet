export const notificationTypeDef = `
  scalar Date
  type Notification {
    _id: ID!
    actorId: Int!,
    notifierId: Int!,
    title: String!,
    content: String!,
    type: String!,
    createDate: Date!,
  }

  input CreateNotificationInput {
    notifierId: Int!,
    type: String!,
  }

  type NotificationResponse {
    statusCode: Int!,
    message: String!,
    notifications: [Notification]
  }
`;
  
export const notificationQueries = `
  getNotificationsByUser: [Notification]!
`;

export const notificationMutations = `
  createNotification(createNotificationInput: CreateNotificationInput!): Notification!
`;