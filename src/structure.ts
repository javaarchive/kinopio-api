import type {KinopioClient} from "./main.js";

export class KinopioStructure {
    client: KinopioClient;
    setClient(client: KinopioClient){
        this.client = client;
    }

    /**
     * nanoid that identifies the structure 
     *
     */
    id: string;
}