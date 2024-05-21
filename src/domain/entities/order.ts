 enum OrderStatus {
  Received = 'recebido',
  Preparing = 'em preparação',
  Ready = 'pronto',
  Finished = 'finalizado'
}

 type OrderItem = {
  productId: number
  quantity: number
  productName: string
  price: number
  notes?: string
}

type OrderUpdateInfo = {
  status: OrderStatus
  updatedAt: Date
}

export type Order = {
  id: number
  customerId?: number
  command: number
  orderStatus: OrderStatus
  totalPrice: number
  items: OrderItem[]
  orderUpdatedAt: OrderUpdateInfo[]
  createdAt: Date
};
