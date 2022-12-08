import {KinopioStructure} from "./structure.js";

export class User extends KinopioStructure {
    async fetchSelf(){
        let data = await this.client.fetch("/user");
        console.log(JSON.stringify(data,null,4));
    }
}