import {noteJsonType} from "@/libs/types/noteType";

export type switchType = "completed" | "pending"

export interface userJsonType {
    UID: number;
    Username: string;
    todo: noteJsonType[],
    finished: noteJsonType[]
}

export interface dataPair {
    Pending: noteJsonType[],
    Completed: noteJsonType[]
}