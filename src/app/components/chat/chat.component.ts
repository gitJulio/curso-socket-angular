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
  elemento:HTMLElement;
  mensajes:any[]=[];
  constructor(
    public chatService:ChatService
  ) { }

  ngOnInit() {

    this.elemento=document.getElementById('chat-mensajes')
    this.mensajeSubscription=this.chatService.getMensaje().subscribe(msg=>{
      

      this.mensajes.push(msg)
      setTimeout(()=>{
        this.elemento.scrollTop=this.elemento.scrollHeight;
      },50);
    })
  }

  enviar(){
    if(this.texto.trim().length===0){
      return
    }
    console.log(this.texto);
    this.chatService.sendMensaje(this.texto)
    this.texto=''
    
  }

  ngOnDestroy(){
    this.mensajeSubscription.unsubscribe;
  }

}
