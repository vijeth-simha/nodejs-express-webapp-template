import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Image {
    @PrimaryGeneratedColumn()
    id: number

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

    @Column({
        nullable:true
    })
    imagePath: string;
}