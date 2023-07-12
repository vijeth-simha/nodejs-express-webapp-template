import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { MetaData } from '../interfaces';


@Entity()
export default class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string;

    @Column({
        nullable:true
    })
    headline:string;

    @Column({
        nullable:true,
        type:"longtext"
    })
    shortDescription:string;

    @Column()
    price: string;

    @Column({
        nullable:true
    })
    rating: string;

    @Column({
        nullable:true
    })
    imagePath: string;

    @Column({type:"longtext"})
    courseDescription: string;

    @Column({
        nullable:true
    })
    createdAt: Date;

    @Column({
        nullable:true
    })
    updatedAt: Date;

    @Column("simple-json",{
        nullable:true
    })
    meta: MetaData

    @Column("simple-json",{
        nullable:true
    })
    courseContent: {title:string,info:string}[]


}