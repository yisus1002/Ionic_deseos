// ...
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItems='';


  constructor(private deseosService: DeseosService,
                private router: ActivatedRoute  ) {

                const listaId= this.router.snapshot.paramMap.get('listaId');
                // console.log(listaId);
                this.lista =this.deseosService.obtenerLista(listaId);
                // console.log(this.lista);



   }

  ngOnInit() {
  }
  agregarItems(){
    if(this.nombreItems.length===0){
      return;
    }
    const nuevoItem= new  ListaItem(this.nombreItems)
    this.lista.items.push(nuevoItem);
    this.nombreItems='';
    this.deseosService.guardarstorage();
  }
  cambiocheck(item:ListaItem){
    const pendientes= this.lista.items.filter(itemData=>{
      return (!itemData.completado)
    }).length
    // console.log({pendientes})
    if(pendientes===0){
      this.lista.terminadaEn=new Date();
      this.lista.terminada=true;
    }else{
      this.lista.terminadaEn=null;
      this.lista.terminada=false;

    }
    this.deseosService.guardarstorage()
    console.log(this.lista.terminadaEn)

  }
  borrar(i:string | number){
    i=Number(i);
    this.lista.items.splice(i,1);
    this.deseosService.guardarstorage();
  }
}
