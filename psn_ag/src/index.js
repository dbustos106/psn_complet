import http from 'http';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import schema from './graphQLSchema';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { AuthAPI } from './authentication/api'
import { UserAPI } from './authentication/user/api'
import { PostAPI } from './post/api'
import { CommentAPI } from './post/comment/api';
import { ContentElementAPI } from './post/contentElement/api';
import { ReactionAPI } from './post/reaction/api';
import { ReportAPI } from './post/report/api';
import { ConversationAPI } from './chat/conversation/api';
import { MessageAPI } from './chat/message/api';
import { NotificationAPI } from './notification/api';
import { RelationShipAPI } from './relationShip/api';
import { BlockingAPI } from './relationShip/blocking/api';
import { FollowUpAPI } from './relationShip/follow-Up/api';
import { SearchAPI } from './relationShip/search/api';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    schema,
    csrfPrevention: false,
});

// server startup
async function startServer() {
    await server.start();
    app.use(
        '/',
        cors({origin: '*'}),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async({ req }) => {
                return {
                    dataSources: {
                        authAPI: new AuthAPI({ req }),
                        userAPI: new UserAPI({ req }),
                        postAPI: new PostAPI({ req }),
                        commentAPI: new CommentAPI({ req }),
                        contentElementAPI: new ContentElementAPI({ req }), 
                        reactionAPI: new ReactionAPI({ req }),
                        reportAPI: new ReportAPI({ req }),
                        conversationAPI : new ConversationAPI({ req }),
                        messageAPI : new MessageAPI({ req }),
                        notificationAPI: new NotificationAPI({ req }),
                        relationShipAPI: new RelationShipAPI({ req }),
                        blockingAPI: new BlockingAPI({ req }),
                        followUpAPI: new FollowUpAPI({ req }),
                        searchAPI: new SearchAPI({ req }),
                    }
                }
            },
        }),
    );
}
startServer();

// modified server startup
async function modifiedServerStartup() {
    await new Promise((resolve) => httpServer.listen({ port: 4500 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4500/`);
}
modifiedServerStartup();