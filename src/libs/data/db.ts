'use server'

import {PrismaClient} from "@prisma/client";

export const dbConnect = async () => {
    return new PrismaClient()
};

export const dbDisconnect = async (client: PrismaClient) => {
    await client.$disconnect()
};
