
export interface Customer {
    name: string;
    address: string;
    tel: string;
}

export interface Invoice {
    id: number;
    date: Date;
    customer: number;
    product: number;
    quantity: number;
    lineTotal: number;
}

export interface Product {
    desc: string;
    price: number;
}

export interface GetInvoice {
    id: number;
    date: Date;
    lineTotal: number;
    quantity: number;
    name: string;
    address: string;
    tel: string;
    desc: string;
    price: number;
}