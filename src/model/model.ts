
interface LoginRequest {
    id: string;
}

interface Machine {
    uuid: string;
    name: string;
    location: string;
    status: string;
    StorageDetails: Storage[];
}

interface Storage {
    product_id: number;
    quantity: number;
}

interface Product {
    id: number;
    name: string;
    details: string;
    img_url: string;
    price: number;
}