import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Service, Team } from '../interfaces';

@Entity()
export default class About {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string;

    @Column({
        nullable:true
    })
    createdAt: Date;

    @Column({
        nullable:true
    })
    updatedAt: Date;

    @Column({
        nullable:true
    })
    headline:string;

    @Column({
        nullable:true
    })
    shortDescription:string;

    @Column()
    aboutDescription: string;

    @Column({
        nullable:true
    })
    imagePath: string;


    @Column({
        nullable:true
    })
    whyChooseUsDescription: string;

    @Column("simple-json",{
        nullable:true,
    })
    whyChooseUs: Service[]


    @Column("simple-json",{
        nullable:true,
    })
    team: Team[]

}