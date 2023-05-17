import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedidos } from 'src/app/interfaces/pedidos/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http : HttpClient) { }

  getPedidos():Observable<Pedidos>{
    return this.http.get<Pedidos>('https://apex.oracle.com/pls/apex/wksp_testcurso1998/kitchen_staff/pedidos');
  }
  updatePedidos(body:any, options:any){
    return this.http.put('https://apex.oracle.com/pls/apex/wksp_testcurso1998/kitchen_staff/pedidos', body, options);
  }
}
