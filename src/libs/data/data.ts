
import {noteJsonType, noteType, switchType} from "@/libs/types/noteType";
import {userJsonType, userType} from "@/libs/types/dataTypes";
import data from './data.json'
import {sql} from '@vercel/postgres';



export async function postgresGetData(username : string, type: "pending" | "completed") {

    let tableName: string;
    let isDone: boolean;

    switch (type) {
        case "completed":
            tableName = "dones";
            isDone = true;
            break;

        case "pending":
            tableName = "todos";
            isDone = false;
            break;

        default:
            throw new Error("Wrong type");
    }


    let rows: any , fields: any;
    try {
        ( {rows, fields} = await sql
            `SELECT todo_id, task_txt, difficulty FROM ${tableName}
        INNER JOIN users on todos.user_id = (
            SELECT user_id FROM users
            WHERE username = '${username}'
            LIMIT 1);` )
    } catch (error) {
        console.error('Error: ' + error);
        throw error;
    }
    console.log(`rows = ${rows} \n fields = ${fields}`);

    let data: noteJsonType[] = [
        {
            ID: 0,
            isDone: false,
            difficulty: "",
            text: "Some text"
        }
    ]

    return data;
}

export async function getData(userToken : string, type: switchType): Promise<noteJsonType[]> {

    // let dataJSON: userJsonType[] = data;
    // let userData: userJsonType | undefined = dataJSON.filter((field) => field.Username == userToken).at(0);
    // let finData: noteJsonType[];
    //
    // if (userData == undefined) {
    //     throw new Error(`Cannot retrieve user ${userToken} data`);
    // }
    //
    // switch (type) {
    //     case "pending":
    //         finData = userData.todo;
    //         break;
    //
    //     case "completed":
    //         finData = userData.finished;
    //         break;
    //
    //     default:
    //         throw new Error(`Unknown type "${type}"`);
    // }

        // return finData;
    return await postgresGetData(userToken, type);
}

export function updateList() {
    return;
}