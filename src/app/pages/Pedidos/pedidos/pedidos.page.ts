import { Component, OnInit } from '@angular/core';
import { error, log } from 'console';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos:any=[];

  constructor(private pedido: PedidoService) { }

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos(){
    this.pedido.getPedidos().subscribe(
      resp =>{
        this.pedidos = resp.items;
        console.log(this.pedidos);
      },error=>{
        console.error(error);

      }
    );
  }

}
