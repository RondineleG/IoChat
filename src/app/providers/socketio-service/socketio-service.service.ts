import { Injectable, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Socket } from 'ng-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketioServiceService implements OnInit{

  message: String= "";
  messages = [];
  currentUser: String = "";
 
  join: Boolean = false;
  joined: Boolean = false;

  constructor(public navCtrl: NavController, public socket: Socket, private toastCtrl: ToastController){}
  
  ngOnInit() {}

  sendMessage(message){
    this.socket.emit('send-message', {text: message});
    return "";
  }

  ionViewWillLeave(){
    this.exitRoom();
  }

  async showToast(msg){
    let toast = await this.toastCtrl.create({
      message:msg,
      position: 'top',
      duration: 2000
    })
    toast.present();
  }

  joinRoom(userName){
    
      this.socket.connect();

      let name = userName;
      this.currentUser = name;
  
      this.socket.emit('set-name', name);
  
      this.socket.fromEvent('users-changed').subscribe(data =>{
        console.log(data);
        let user = data['user'];
        if(data['event'] == 'left'){
          this.showToast(`User left: ${user}`);
        }else{
          this.showToast(`User joined: ${user}`);
        }
      })
      
    
    
    return true;
  }

  showMessages(messages){
    if(!this.joined){
      var socket = this.socket.fromEvent('message').subscribe(message=>{
        console.log('New: ', message);
        messages.push(message);
      })
      this.joined = true;
    }
    return socket;
  }

  exitRoom(){
    this.socket.disconnect();
    return false;
  };
}
