'use server'

import {Client, Pool, PoolClient} from 'pg'

type serverClient = Client | PoolClient;
const isDev : boolean = process.env.NODE_ENV === "development";

export async function dbConnect() {

    let client: serverClient | undefined = undefined;
    console.log("Connecting to database...");

    try {
        if (isDev) {

            client = new Client({
                connectionString: process.env.POSTGRES_URL_NON_POOLING
            });
            // console.log("Returning client connection:", client);
            await client.connect()
            console.log('Connected to postgres db (non-pulling)');
        } else {

            const pollConnection = new Pool({
                connectionString: process.env.POSTGRES_URL,
                idleTimeoutMillis: 10000,
                connectionTimeoutMillis: 5000
            })
            console.log("Returning client connection:", client);
            client = await pollConnection.connect();
            console.log('Connected to postgres db (pulling)');
        }
    }catch (error) {
        console.error(error);
        throw error;
    }

    return client;
}

export async function dbDisconnect(client: serverClient) {
    if (client instanceof Client) {
        await client.end();
        console.log("Disconnected from postgres db (non-pulling)");
    } else {
        client.release();
        console.log("Disconnected from postgres db (pulling)");
    }
}
