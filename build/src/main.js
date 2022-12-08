import https from 'node:https';
import fetch from "node-fetch";
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
class KinopioClient {
    apiKey;
    agent;
    apiUrl = "https://api.kinopio.club";
    wsHost = "kinopio-server.herokuapp.com";
    options;
    constructor(options) {
        if (!options.apiKey) {
            throw new Error("No api key provided. See documentation for more information on how to obtain one. ");
        }
        this.apiKey = options.apiKey;
        this.agent = new https.Agent(options.https_agent || { keepAlive: true });
        this.options = options;
    }
    async fetch(url, method = "GET", options = {}) {
        for (let i = 0; i < 10; i++) {
            let final_url = url;
            if (!url.startsWith("https://")) {
                final_url = this.apiUrl + url;
            }
            let resp = await fetch(final_url, {
                headers: {
                    "User-Agent": "KinopioJS/0.0.1",
                    "Authorization": this.apiKey
                },
                agent: (_) => this.agent, // assume always https connection to api 
            });
            if (resp.status == 429) {
                await wait(this.options.ratelimit_wait_time || (30 * 1000));
                continue;
            }
            return resp;
        }
    }
}
//# sourceMappingURL=main.js.map