import { Pet } from "src/pet.entity";
import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from "typeorm"

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;

    @OneToMany(() => Pet, pet => pet.owner)
    pets: Pet[]
}