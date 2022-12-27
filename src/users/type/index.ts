import { Exclude } from "class-transformer"
export interface User {
    username: string,
    password: string,
}

export class SerializedUser {
    username: string
    @Exclude()
    password: string
    constructor(patial: Partial<SerializedUser>) {
        // đưa patial apply vào this
        Object.assign(this, patial)
    }
}   
