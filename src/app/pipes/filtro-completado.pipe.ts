// 

import { Lista } from 'src/app/models/lista.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completado:boolean= true): Lista[] {
    return listas.filter(listaData => {
      return listaData.terminada===completado;
    })
  }

}
