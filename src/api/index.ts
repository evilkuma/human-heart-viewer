
import axios from "axios";

import { MeshData } from "../types";

class Api {
    private modelsLoader = axios.create({
        baseURL: '/models',
        responseType: 'arraybuffer'
    });
    private dataLoader = axios.create({
        baseURL: '/data',
        responseType: 'json'
    });

    public async getModelData(filename: string) {
        const data = await this.modelsLoader.get(`${filename}.glb`);
        return data.data as ArrayBuffer;
    }

    public async getData(filename: string) {
        const data = await this.dataLoader.get(`${filename}.json`);
        return data.data as Array<MeshData>;
    }
}

const api = new Api();
export default api;
