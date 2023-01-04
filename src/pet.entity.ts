import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users/user.entity";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;

    @ManyToOne(() => User, user => user.pets)
    owner: User

}