'use server'
import {noteJsonType} from "@/libs/types/noteType";
import {dbConnect, dbDisconnect} from "@/libs/data/db";
import {switchType} from "@/libs/types/dataTypes";

export async function getData(userToken : string, type: switchType): Promise<noteJsonType[]> {

    let tableName: string;
    let id_name: string;

    switch (type) {

        case 'completed':
            tableName = "dones"
            id_name = "done_id"
            break;

        case 'pending':
            tableName = "todos"
            id_name = "todo_id"
            break;

        default:
            throw new Error(`Unsupported type "${type}"`);

    }

    const client = await dbConnect()

    let response;
    try {
        // console.log("NODE_ENV:", process.env.NODE_ENV);

        console.log("Getting data...")
        const query = `SELECT ${id_name}, task_txt, difficulty
                       FROM ${tableName}
                       INNER JOIN users on ${tableName}.user_id = (
                            SELECT user_id FROM users
                            WHERE username = $1 LIMIT 1);`;
        // console.log("Query sent, query:", query)
        response = await client.query(query, [userToken]);
        // console.log("Response:", response)
        console.log("Successfully received data.")
    } catch (error: any) { console.error('DB Error:', error, "response:", response); throw error;
    } finally { await dbDisconnect(client);}

    // console.log('Response:', response.rows[0]);

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

export async function updateList() {
    return;
}