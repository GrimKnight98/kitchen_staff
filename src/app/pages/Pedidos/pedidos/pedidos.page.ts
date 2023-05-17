import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { error, log } from 'console';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos:any=[];
  newPedidos:any[]=[];
  enProceso:any[]=[];
  completado:any[]=[];

  constructor(private pedido: PedidoService,
              private loadingCtrl: LoadingController,
              private router : Router) { }

  ngOnInit() {
    this.getPedidos();
  }

  ionViewWillEnter(){
    this.getPedidos();
  }

  getPedidos(){
    this.pedido.getPedidos().subscribe(
      resp =>{
        this.pedidos = resp.items;
        console.log(this.pedidos.length);
        this.newPedidos=[];
        this.enProceso =[];
        this.completado=[];
        for (let index = 0; index < this.pedidos.length; index++) {

          console.log(this.pedidos[index].status);

          switch (this.pedidos[index].status) {
            case 'PEDIDO':

              this.newPedidos.push(this.pedidos[index]);
              break;
            case 'en proceso':

              this.enProceso.push(this.pedidos[index]);
              break;
            case 'completado':

              this.completado.push(this.pedidos[index]);
              break;

            default:
              break;
          }

        }
        console.log(this.newPedidos);
        console.log(this.enProceso);


      },error=>{
        console.error(error);

      }
    );
  }

  async aceptarPedido(pedido_id:any){
    const loading = await this.loadingCtrl.create({
      message: 'Espere...',
    });
    loading.present();
    var options = {
      headers: {
          'Content-Type': 'application/json'
     }
   };
    var body = {
      "id_pedido":pedido_id
    }
    this.pedido.updatePedidos(body, options).subscribe(
      resp=>{
       console.log(pedido_id, body);

       console.log("OK");
       loading.dismiss();
       this.getPedidos();
      }

    )
    this.router.navigate(['pedidos']);
  }

}
