import {config} from "dotenv";

import KinopioClient from "../main.js";

config();

const client = new KinopioClient({
    apiKey: process.env.KINOPIO_API_KEY,
});

client.initalize();

client.getUser().then(console.log);