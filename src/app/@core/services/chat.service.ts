import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';
import { environment } from '../../../environments/environment';

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message: Subject<Message>;

  constructor(private wsService: WebsocketService) {
    this.message = wsService.connect(environment.wsUrl).pipe(
      map(
        (response: MessageEvent): Message => {
          const data = JSON.parse(response.data);
          return {
            author: data.author,
            message: data.message,
          };
        }
      )
    ) as Subject<Message>;
  }
}
