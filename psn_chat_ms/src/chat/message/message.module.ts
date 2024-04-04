import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Conversation,
  ConversationSchema,
} from '../conversation/entity/conversation.entity';
import { Message, MessageSchema } from './entity/message.entity';

import { MessageService } from './message.service';
import { MessageSocketGateway } from './message.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  providers: [MessageService, MessageSocketGateway],
  exports: [MessageService],
})
export class MessageModule {}
