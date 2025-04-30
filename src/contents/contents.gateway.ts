import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Content } from './schemas/content.schema';

@WebSocketGateway({ cors: true })
export class ContentsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  broadcastNewContent(content: Content) {
    this.server.emit('new_content', content);
  }
}
