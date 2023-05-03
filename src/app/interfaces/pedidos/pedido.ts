export interface Pedidos {
  items: Item[];
}

export interface Item {
  pedido_id:       number;
  mesa:            number;
  fecha:           Date;
  status:          string;
  articulos_orden: ArticulosOrden[];
}

export interface ArticulosOrden {
  item_id:      number;
  cantidad:     number;
  extra_comida: string;
}
