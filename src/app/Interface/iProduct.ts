export interface Product {
    _id: string;
    name: string;
    image_url: string;
    price: number;
    quantity: number;
}

export interface orderProduct {
    _id: string;
    name: string;
    image_url: string;
    price: number;
    quantity: number;
    total: number | undefined;
}

export interface order {
    user_id: string;
    session: string;
    products: string[];
}