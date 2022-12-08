import https from 'node:https';


import fetch from "node-fetch";

import {User} from "./user.js";


interface KinopioClientOptions {
    /**
     * The Kinopio API key to use for requests. You can find this on your account settings. 
     */
    apiKey: string;
    /**
     * Https agent options, defaults to keep alive on. 
     */
    https_agent?: https.AgentOptions;
    
    ratelimit_wait_time?: number;
}

function wait(ms: number): Promise<void>{
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class KinopioClient {
    apiKey: string;
    agent: https.Agent;
    apiUrl = "https://api.kinopio.club"
    wsHost = "kinopio-server.herokuapp.com"
    options: KinopioClientOptions;

    user: User;

    constructor(options: KinopioClientOptions){
        if(!options.apiKey){
            throw new Error("No api key provided. See documentation for more information on how to obtain one. ");
        }
        this.apiKey = options.apiKey;
        this.agent = new https.Agent(options.https_agent || {keepAlive: true});
        this.options = options;
    }

    async fetch(url: string, method = "GET", options: any = {}){
        for(let i = 0; i < 10; i ++){
            let final_url = url;
            if(!url.startsWith("https://")){
                final_url = this.apiUrl + url;
            }
            let resp = await fetch(final_url, {
                headers: {
                    "User-Agent": "KinopioJS/0.0.1",
                    "Authorization": this.apiKey
                },
                agent: (_) => this.agent, // assume always https connection to api 
            });
            if(resp.status == 429){
                await wait(this.options.ratelimit_wait_time || (30 * 1000));
                continue;
            }
            if(!options.raw){
                return (await resp.json());
            }
            return resp;
        }
        
    }

    async getUser(){
        let user = new User();
        user.setClient(this);
        await user.fetchSelf();
        return user;
    }

    

    /**
     * Not needed but preloads a lot of data to be accessed as attributes. 
     */
    async initalize(){
        this.user = await this.getUser();
    }

}

export default KinopioClient;

export {User};

export {KinopioClient, KinopioClientOptions};