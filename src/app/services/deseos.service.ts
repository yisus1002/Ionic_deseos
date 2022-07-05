// ----
import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  Listas: Lista[]=[];

  constructor() { 
    this.cargarstorage() 
  }
  crearLista(titulo:string){
    const nuevalista = new Lista(titulo);
    this.Listas.push(nuevalista)
    this.guardarstorage();
    return  nuevalista.id;
  }
  borrarlista(lista:Lista){
    this.Listas=this.Listas.filter(listaData =>{
      return (listaData.id !== lista.id)
    })
    this.guardarstorage();
  }
  obtenerLista(id:string | number){
    id=Number(id);
   return this.Listas.find((listadta)=>{return   (listadta.id===id); });
  }
  guardarstorage(){
    localStorage.setItem('data',JSON.stringify(this.Listas));
  }
  cargarstorage(){
    if(localStorage.getItem('data')){
      this.Listas = JSON.parse(localStorage.getItem('data'));
    }else{
      this.Listas=[];
    }
  }
}
