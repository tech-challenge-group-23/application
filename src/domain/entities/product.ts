export type Product = {
    id?: number
    categoryId: Int16Array
    name: string
    description?: string
    price: number
    image?: Buffer
    createdAt?: string
    updatedAt?: string
};

export type ProductServiceResponse = {
    created?: boolean
    isValid?: boolean
    wasFound?: boolean
    products?: Product[]
    message?: string
    errorMessage?: string
};