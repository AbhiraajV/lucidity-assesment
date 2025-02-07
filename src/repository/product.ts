import axios from "axios";
import { ProductWithoutMetadata } from "../types/product";
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

export class ProductRepository {
    static getAllProducts:()=>Promise<ProductWithoutMetadata[]> = async () => {
        const response = await axios.get(`${BACKEND_HOST}/inventory`,);
        return response.data as ProductWithoutMetadata[];
    };
}