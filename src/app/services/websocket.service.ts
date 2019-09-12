import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../class/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;
  public usuario:Usuario
  constructor(
    private socket:Socket
  ) {
    this.cargarStorage();
    this.checkStatus();

  }

  checkStatus(){
    this.socket.on('connect',()=>{
      console.log("Conectado al servidor");
      this.socketStatus=true;
      this.cargarStorage();
    })

    this.socket.on('disconnect',()=>{
      console.log("Desconectado del Servidor ");
      this.socketStatus=false;
    })
  }

  emit(evento:string, payload?:any, callback?:Function){
    console.log('Emitiendo', evento);

    //emit('EVENTO',payload,callback?)
    this.socket.emit(evento, payload, callback);
  }

  listen(evento:string){
    return this.socket.fromEvent( evento);
  }

  loginWs(nombre:string){

    console.log('Configurando', nombre);
    return new Promise((resolve, reject)=>{
        
        this.usuario=new Usuario(nombre)
        this.guardarStorage();
        this.socket.emit('configurar-usuario', {nombre}, resp=>{
          resolve();
        }
      );
    })
  }

  guardarStorage(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario))
  }

  cargarStorage(){
    if(localStorage.getItem('usuario')){
      this.usuario=JSON.parse(localStorage.getItem('usuario'))
      this.loginWs(this.usuario.nombre)
    }
  }

  getUsuario(){
    return this.usuario;
  }




}
