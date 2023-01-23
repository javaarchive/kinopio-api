import {KinopioStructure} from "./structure.js";

export class User extends KinopioStructure {
    url: string;
    name: string;
    emailIsVerified: boolean = false;
    cardsCreatedCount: number = 0;
    description: string;
    website: string;

    color: string;

    controllable: boolean = false; // can be controlled by this client. 

    loadJson(data: any){
        this.url = data.url;
        this.id = data.id;
        this.name = data.name;
        this.emailIsVerified == data.emailIsVerified;
        this.color = data.color;
        this.cardsCreatedCount = data.cardsCreatedCount;
        this.description = data.description;
        this.website = data.website;
        this.controllable = true;
    }

    async fetchSelf(){
        let data: any = await this.client.fetch("/user");
        // console.log(JSON.stringify(data,null,4));
        this.loadJson(data);
    }

    async syncSelf(){
                
    }

    async sync(){
        if(!this.controllable){
            throw new Error("User is not contrallable. ");
        }
        await this.syncSelf();
    }
}