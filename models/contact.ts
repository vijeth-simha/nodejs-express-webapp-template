import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class Contact {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
        nullable:true
    })
    name: string

    @Column({
        nullable:false,
    })
    phone: string;

    @Column({
        nullable:true
    })
    createdAt: Date;

    @Column({
        nullable:false
    })
    email: string

    @Column({
        nullable:true
    })
    country: string

    @Column({
        nullable:true
    })
    subject: string

    @Column({
        nullable:true
    })
    message: string
}