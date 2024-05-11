// Define a type for an item in the order
export type Product = {
    categoryId: Int16Array,
    name: string,
    description: string,
    price: Float32Array,
    image: BinaryData,
};

// Define a type for the order
// Example usage:
// const order: Order = {
//     orderId: "123456",
//     customerName: "John Doe",
//     items: [
//         { productName: "Laptop", quantity: 1, price: 999 },
//         { productName: "Mouse", quantity: 2, price: 20 }
//     ],
//     total: 1039, // Total price of all items
//     orderDate: new Date("2024-05-07"),
// };