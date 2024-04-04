import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateNotificationDto } from './DTO/createNotification.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject('NOTIFICATION_RMQ_SERVICE')
    private notificationRMQService: ClientProxy,
  ) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const notification = await this.notificationService.createNotification(
      createNotificationDto,
    );

    const {
      actorId,
      notifierId,
      type,
      title,
      content,
      createDate,
      updateDate,
    } = notification;

    const createNotificationWsDto = {
      actorId,
      notifierId,
      type,
      title,
      content,
      createDate,
      updateDate,
    };

    try {
      await this.notificationRMQService.emit(
        'CREATE_NOTIFICATION',
        createNotificationWsDto,
      );
    } catch (error) {
      throw new RpcException(error);
    }
    return notification;
  }

  @Get('/user/:userId')
  async getNotificationsByUser(
    @Param('userId') userId: number,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    const paginationDto = { limit, offset };
    return await this.notificationService.getNotificationsByUser(
      userId,
      paginationDto,
    );
  }
}
