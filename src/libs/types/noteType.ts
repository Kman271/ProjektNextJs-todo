
export type diffType = 'easy' | 'normal' | 'hard';
export type switchType = 'completed' | 'pending'

export interface noteType {
    ID: number;
    isDone: switchType;
    difficulty: diffType;
    text: string;
}

export interface noteJsonType {
    ID: number;
    isDone: boolean;
    difficulty: string;
    text: string;
}