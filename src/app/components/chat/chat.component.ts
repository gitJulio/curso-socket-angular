import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto=''
  mensajeSubscription:Subscription;
  constructor(
    public chatService:ChatService
  ) { }

  ngOnInit() {

    this.mensajeSubscription=this.chatService.getMensaje().subscribe(msg=>{
      console.log(msg);
      
    })
  }

  enviar(){
    console.log(this.texto);
    this.chatService.sendMensaje(this.texto)
    this.texto=''
    
  }

  ngOnDestroy(){
    this.mensajeSubscription.unsubscribe;
  }

}
