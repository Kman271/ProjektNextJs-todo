import {noteJsonType, noteType} from "@/libs/types/noteType";

export interface userType{
    UID: number;
    Username: string;
    todo: noteType[],
    finished: noteType[]
}
export interface userJsonType {
    UID: number;
    Username: string;
    todo: noteJsonType[],
    finished: noteJsonType[]
}
