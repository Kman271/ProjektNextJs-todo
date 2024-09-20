'use server'
import {noteJsonType} from "@/libs/types/noteType";
import {dbConnect, dbDisconnect} from "@/libs/data/db";
import {switchType, userType} from "@/libs/types/dataTypes";
import {number, string} from "zod";


function getDatabaseName(isDone: boolean) {
    const tables = {dones: 'dones', todos: 'todos'};
    return isDone ? tables.dones : tables.todos;
}
function getIDName(isDone: boolean) {
    const IDs = {done_id: 'done_id', todo_id: 'todo_id'};
    return isDone ? IDs.done_id : IDs.todo_id;
}

export async function getData(userToken : string, type: switchType): Promise<noteJsonType[]> {

    const tableName: string = getDatabaseName(type == 'completed')
    let id_name: string = getIDName(type == 'completed' as switchType);

    const client = await dbConnect()

    let response;
    try {

        console.log("Getting data...")
        const query = `SELECT ${id_name}, task_txt, difficulty
                       FROM ${tableName}
                       INNER JOIN users on ${tableName}.user_id = (
                            SELECT user_id FROM users
                            WHERE username = $1 LIMIT 1);`;
        response = await client.query(query, [userToken]);
        console.log("Successfully received data.")

    } catch (error: any) { console.error('DB Error:', error, "response:", response); throw error;

    } finally { await dbDisconnect(client);}

    let data: noteJsonType[] = response.rows.map( row => (
        {
            ID: row[id_name],
            isDone: type == 'completed',
            difficulty: row["difficulty"],
            task_txt: row["task_txt"]
        }
    ))

    // console.log(data)

    return data;
}

export async function dbAddNote(userToken: string, noteObj: noteJsonType) {

    const client = await dbConnect();
    const tableName: string = getDatabaseName(noteObj.isDone);


    let response;
    try {

        console.log("Sending data...")
        const query = `INSERT INTO ${tableName}(user_id, task_txt, difficulty)
                            VALUES((SELECT users.user_id FROM users WHERE username = $1), 
                            $2, $3);`;
        response = await client.query(query, [userToken, noteObj.task_txt, noteObj.difficulty]);
        console.log("Response for data sent:", response)

    } catch (error: any) { console.error('DB send data Error:', error, "response:", response); throw error;

    } finally { await dbDisconnect(client);}

}

export async function dbDeleteNote(userToken: string, noteId: number, isDone: boolean) {

    const tableName: string = getDatabaseName(isDone);
    const id_name: string = getIDName(isDone);
    const client = await dbConnect();

    let response;
    try {

        console.log("Deleting data...")
        const query = `DELETE FROM ${tableName} WHERE ${id_name}=$1 AND user_id = (SELECT user_id FROM users
                                                      WHERE username = $2)`;
        response = await client.query(query, [noteId, userToken]);
        console.log("Response for data delete:", response)

    } catch (error: any) { console.error('DB delete data Error:', error, "response:", response); throw error;

    } finally { await dbDisconnect(client);}

    return;
}

export async function dbAddUser(username: string, password: string) {

    const client = await dbConnect();

    let response;
    try {
        console.log("Deleting data...")
        const query = `INSERT INTO users(username, password)
        VALUES($1, $2)`;
        response = await client.query(query, [username, password]);
        console.log("Response for user add:", response)
    } catch (error: any) { console.error('DB add user Error:', error, "response:", response); throw error;
    } finally { await dbDisconnect(client);}

    return;
}


export async function dbUpdateList(IDs: number[]) {

    const tableDoneName: string = getDatabaseName(true);
    const tableTodoName: string = getDatabaseName(false);
    const idTodoName: string = getIDName(false);
    const client = await dbConnect();

    const insertQuery = `
        WITH movingRows AS (
            SELECT ${tableTodoName}.user_id, task_txt, difficulty FROM ${tableTodoName}
            INNER JOIN users ON users.user_id = ${tableTodoName}.user_id
            WHERE ${idTodoName} = ANY($1)
        )
        INSERT INTO ${tableDoneName} (user_id, task_txt, difficulty)
        SELECT user_id, task_txt, difficulty FROM movingRows;
    `;

    const deleteQuery = `
        DELETE FROM ${tableTodoName}
            WHERE ${idTodoName} = ANY($1);
    `;

    try {
        console.log("Updating data...");

        console.log("Begin");
        await client.query("BEGIN;")

        console.log("Inserting data...");
        await client.query(insertQuery, [IDs]);

        console.log("Deleting data...");
        await client.query(deleteQuery, [IDs]);

        console.log("Commit");
        await client.query("COMMIT;")

        console.log("Data updated successfully.");
    } catch (error: any) {
        console.error('DB update data Error:', error);
        await client.query("ROLLBACK");
        throw error;
    } finally { await dbDisconnect(client);}
}

export async function dbGetUsers() {
    const client = await dbConnect();
    const query = `SELECT * FROM users`;
    let response;
    let users: userType[];

    try {
        console.log("Getting users...");
        response = await client.query(query);
        console.log("Got users list");
    } catch (error) {
        console.error("User data get Error:", error)
        throw error;
    } finally {
        await dbDisconnect(client)
    }

    users = response.rows.map(row => ({
        user_id: row['user_id'],
        username: row['username'],
        password: row['password']
    }))

    return users;
}