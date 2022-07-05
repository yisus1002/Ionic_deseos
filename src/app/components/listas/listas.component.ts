import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model'; 
import { Router } from '@angular/router';
// ...
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService, 
    private router: Router,
    public alertctr: AlertController ) { 
      
    }

  ngOnInit() {}

  ListaSeleccionada(lista:Lista){
    // console.log(lista);
    if(this.terminada===true){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)
    }else{

      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)
    }
  
    }
    borrarlista(lista:Lista){
      this.deseosService.borrarlista(lista);
      
    }
 async   editar(lista:Lista){
      // console.log(lista.id)
      const alert = await this.alertctr.create({
        cssClass: 'my-custom-class',
        header: 'Editar titulo', 
        inputs:[{
          name: 'titulo',
          type:'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }], 
        buttons: [
          { text:'Cancelar', role: 'cancel',  handler:()=>{ console.log('Cancelar'); this.lista.closeSlidingItems(); }, },
          { text: 'Guardar', handler:(data)=>{ console.log(data)
          if(data.titulo.length === 0){
            return;
          }else{
            lista.titulo = data.titulo;
            this.deseosService.guardarstorage(); 
            this.lista.closeSlidingItems();
      }
    }}
  ]
  });
  await alert.present();
    }
}
