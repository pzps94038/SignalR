import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _connection?: signalR.HubConnection;

  start() {
    if (this._connection) {
      return this._connection;
    } else {
      this._connection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.baseUrl}/chathub`)
        .build();
      this._connection
        .start()
        .then(() => console.log('Connection started!'))
        .catch((err) => {
          this._connection = undefined;
          console.log('Error while establishing connection :(');
        });
      return this._connection;
    }
  }

  stop() {
    this._connection?.stop();
  }

  /**
   * 公開聊天室及時更新列表
   * @returns
   */
  publicLiveChatRoom() {
    return new Observable<any>((subscriber) => {
      this.start().on('PublicLiveChatRoom', (liveChatRoom) => {
        subscriber.next(liveChatRoom);
      });
    });
  }

  /**
   * 公開訊息及時更新
   * @returns
   */
  publicMessage() {
    return new Observable<any>((subscriber) => {
      this.start().on('PublicMessage', (name, msg) => {
        subscriber.next({
          name,
          msg,
        });
      });
    });
  }

  /**
   * 私密訊息及時更新
   * @returns
   */
  privateMessage() {
    return new Observable<any>((subscriber) => {
      this.start().on('PrivateMessage', (name, msg) => {
        subscriber.next({
          name,
          msg,
        });
      });
    });
  }
}
