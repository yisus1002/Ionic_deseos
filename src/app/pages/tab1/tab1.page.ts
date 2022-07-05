// ---
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lista:any[]=[];
  constructor(public deseosService: DeseosService, 
              private router: Router,
              private alertctr: AlertController) { 
                console.log(this.deseosService.Listas)
  } 
   async agregarlisa(){
     
    // this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertctr.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista', 
      inputs:[{
        name: 'titulo',
        type:'text',
        placeholder: 'Nombre de la lista'
      }], 
      buttons: [
        { text:'Cancelar', role: 'cancel',  handler:()=>{ console.log('Cancelar') }, },
        { text: 'Crear', handler:(data)=>{ console.log(data)
        if(data.titulo.length === 0){
          return;
        }else{
          
      const listaId=  this.deseosService.crearLista(data.titulo);
        
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
    }
  }}
]
});
await alert.present();
}

}
