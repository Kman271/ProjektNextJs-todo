
export type diffType = 'easy' | 'medium' | 'hard';

export interface noteJsonType {
    ID: number;
    isDone: boolean;
    difficulty: diffType;
    task_txt: string;
}