import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'signalR-Angular';
  nick = 'Jeff';
  message: string = 'msg';
  private connection!: signalR.HubConnection;

  ngOnInit() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chathub')
      .build();
    this.createConection();
  }

  sendMessage() {
    return this.connection.invoke('JoinLiveChatRoom', this.nick).then((res) => {
      console.warn(res);
    });
  }
  createConection() {
    this.connection
      .start()
      .then(() => console.log('Connection started!'))
      .catch((err) => console.log('Error while establishing connection :('));
  }
}
