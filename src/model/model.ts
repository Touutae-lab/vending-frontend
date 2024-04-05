
interface LoginRequest {
    id: string;
}

interface Machine {
    uuid: string;
    name: string;
    location: string;
    status: string;
    storageDetails: Storage;
}

interface Storage {
    productId: number;
    quantity: number;
}