export interface ITask{
    id: string;
    name: string;
    description: string;
    complete: boolean;
    createdAt: Date;
    updatedAt:Date;
}

export interface INewTask{
    name: string;
    description: string;
}

export interface IUpdateTask{
    name?: string;
    description?: string;
    complete?: boolean;
}