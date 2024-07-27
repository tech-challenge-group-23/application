export interface MercadoPagoPort {
    generateQRCode(orderID: number, totalPrice: number): Promise<string>
}
