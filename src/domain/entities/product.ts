export type Product = {
    categoryId: Int16Array,
    name: string,
    description: string,
    price: number,
    image?: Buffer,
};

export type ProductServiceResponse = {
    created: boolean,
    isValid: boolean,
    message?: string | unknown,
};