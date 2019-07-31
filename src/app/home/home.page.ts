import { Component } from '@angular/core';
import { SocketioServiceService } from '../providers/socketio-service/socketio-service.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  message: String = "";
  messages = [];
  currentUser: String = "";
  name: String;
  join: boolean = false;

  constructor(private chatRoom: SocketioServiceService) {}

  joinRoom(name){
    this.join = this.chatRoom.joinRoom(name);
    this.chatRoom.showMessages(this.messages);
  }

  sendMessage(message){
    this.message = this.chatRoom.sendMessage(message);
  }

  exitRoom(){
    this.join = this.chatRoom.exitRoom();
  }

  ionViewWillLeave(){
    this.chatRoom.ionViewWillLeave();
  }
  
}
