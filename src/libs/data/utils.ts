'use server'

import bcrypt from 'bcryptjs';

const saltRounds = 16


export async function saltAndHashPassword(password: string): Promise<string> {

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}


export async function compareHashedPassword(hashedPassword: string, password: string): Promise<boolean> {

    return await bcrypt.compare(password, hashedPassword);
}