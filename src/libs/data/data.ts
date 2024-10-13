'use server'
import {noteJsonType} from "@/libs/types/noteType";
import {dbConnect, dbDisconnect} from "@/libs/data/db";
import {switchType, userType} from "@/libs/types/dataTypes";
import {Prisma} from "@prisma/client";


function getDatabaseName(isDone: boolean) {
    const tables = {dones: 'dones', todos: 'todos'};
    return isDone ? tables.dones : tables.todos;
}
function getIDName(isDone: boolean) {
    const IDs = {done_id: 'done_id', todo_id: 'todo_id'};
    return isDone ? IDs.done_id : IDs.todo_id;
}

export const getData = async (username: string, type: switchType) => {

    const client = await dbConnect();

    const id_name = getIDName(type === 'completed' as switchType);
    const tableName = getDatabaseName(type === 'completed' as switchType);

    let data : noteJsonType[];
    try {
         const response: any = await client.$queryRawUnsafe(`
                       SELECT ${id_name}, task_txt, difficulty
                       FROM ${tableName}
                       WHERE ${tableName}.user_id = (
                            SELECT user_id FROM users
                            WHERE username = $1 LIMIT 1
                            );`, username);

         console.log("response is:", response);

         data = response.map( (el: any) => ({
             ID: el[id_name],
             task_txt: el["task_txt"],
             difficulty: el["difficulty"],
             isDone: type === "completed"
         }))
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        await dbDisconnect(client)
    }

    console.log("data:", data)
    return data;
}

export async function dbAddNote(username: string, noteObj: noteJsonType) {

    const client = await dbConnect();
    const tableName: string = getDatabaseName(noteObj.isDone);


    let response;
    try {

        console.log("Sending data...")
        response = await client.$queryRawUnsafe(`INSERT INTO ${tableName}(user_id, task_txt, difficulty)
                            VALUES((SELECT users.user_id FROM users WHERE username = $1),
                            $2, $3::taskdifficulty);`, username, noteObj.task_txt, noteObj.difficulty);

        console.log("Response for data sent:", response)

    } catch (error: any) {
        console.error('DB send data Error:', error, "response:", response);
        throw error;
    } finally {
        await dbDisconnect(client);
    }

}

export async function dbDeleteNote(username: string, noteId: number, isDone: boolean) {

    const tableName: string = getDatabaseName(isDone);
    const id_name: string = getIDName(isDone);
    const client = await dbConnect();

    let response;
    try {

        console.log("Deleting data...")
        response = await client.$queryRawUnsafe(`DELETE FROM ${tableName}
                                          WHERE ${id_name}=${noteId} AND user_id = (SELECT user_id FROM users
                                                                                        WHERE username = $1)`, username);
        console.log("Response for data delete:", response)

    } catch (error: any) {
        console.error('DB delete data Error:', error, "response:", response);
        throw error;
    } finally {
        await dbDisconnect(client);
    }

    return;
}

export async function dbUpdateList(IDs: number[]) {

    const tableDoneName: string = getDatabaseName(true);
    const tableTodoName: string = getDatabaseName(false);
    const idTodoName: string = getIDName(false);
    const client = await dbConnect();

    try {
        console.log("Updating data...");

        console.log("Begin");
        await client.$queryRaw`BEGIN;`

        console.log("Inserting data...");
        await client.$queryRawUnsafe(`
        WITH movingRows AS (
            SELECT ${tableTodoName}.user_id, task_txt, difficulty FROM ${tableTodoName}
            INNER JOIN users ON users.user_id = ${tableTodoName}.user_id
            WHERE ${idTodoName} = ANY($1)
        )
        INSERT INTO ${tableDoneName} (user_id, task_txt, difficulty)
        SELECT user_id, task_txt, difficulty FROM movingRows;`, IDs);

        console.log("Deleting data...");
        await client.$queryRawUnsafe(`DELETE FROM ${tableTodoName}
                               WHERE ${idTodoName} = ANY($1);`, IDs);

        console.log("Commit");
        await client.$queryRaw`COMMIT;`

        console.log("Data updated successfully.");
    } catch (error: any) {
        console.error('DB update data Error:', error);
        await client.$queryRaw`ROLLBACK`;
        throw error;
    } finally { await dbDisconnect(client);}
}

export async function dbGetUsers() {
    const client = await dbConnect();
    let response: any;
    let users: userType[];

    try {
        console.log("Getting users...");
        response = await client.$queryRaw`SELECT * FROM users`;
        console.log("Got users list");
    } catch (error) {
        console.error("User data get Error:", error)
        throw error;
    } finally {
        await dbDisconnect(client)
    }

    users = response.map((row: any) => ({
        user_id: row.user_id,
        username: row.username,
        password: row.password
    }))

    console.log("Users data:", users)

    return users;
}

export async function dbAddUser(username: string, password: string) {
    const client = await dbConnect();
    let response: any;

    try {
        console.log("Getting users...");
        await client.$queryRaw`BEGIN;`;

        response = await client.$queryRawUnsafe(`INSERT INTO users(username, password)
                                                    VALUES($1,$2);`, username, password);
        console.log("Got response:", response);

        await client.$queryRaw`COMMIT;`
        console.log("Commit");
    } catch (error) {
        let errString;

        console.error("User Register Error:", error)
        await client.$queryRaw`ROLLBACK;`;

        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2010':
                    errString = "User already exists";
                    break;
                default:
                    break;
            }
        }
        throw new Error(errString || "Unknown error");

    } finally {
        await dbDisconnect(client)
    }

    console.log("Added user:", {username, password});
}