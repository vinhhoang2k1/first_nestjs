import { Injectable } from '@nestjs/common';
import { plainToClass } from "class-transformer"
import { User, SerializedUser } from 'src/users/type';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            username: 'vinh',
            password: 'vinh'
        },
        {
            username: 'hoang',
            password: 'hoang'
        },
        {
            username: 'anh',
            password: 'anh'
        },
        {
            username: 'nam',
            password: 'nam'
        },
        {
            username: 'duong',
            password: 'duong'
        },
    ]
    getUser() {
        return this.users.map((user) => new SerializedUser(user))
    }
    getUserByUsername(username: string) {
        return this.users.find((user) => user.username === username)
    }
}
