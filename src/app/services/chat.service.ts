import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService:WebsocketService
  ) { }


  sendMensaje(mensaje:string){
    const payload ={
      de:this.wsService.getUsuario().nombre,
      cuerpo:mensaje
    }
    this.wsService.emit('mensaje', payload)
  }

  getMensaje(){
    return this.wsService.listen('mensaje-nuevo')
  }

  getMessagesPrivate(){
    return this.wsService.listen('mensaje-privado')
  }

  getUsuarioActivos(){
    return this.wsService.listen('usuarios-activos');
  }

  obtenerActivos(){
    return this.wsService.emit('obtener-activos');
  }



}
