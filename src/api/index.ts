
import axios from "axios";

class Api {
    private modelsLoader = axios.create({
        baseURL: '/models',
        responseType: 'arraybuffer'
    });

    public async getModelData(filename: string) {
        const data = await this.modelsLoader.get(`${filename}.glb`);
        return data.data;
    }
}

export default new Api();
