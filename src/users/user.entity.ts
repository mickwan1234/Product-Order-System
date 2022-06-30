import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class User{
    @PrimaryColumn()
    public username:string

    @Column()
    public password:string

    @Column()
    public name:string

    @Column()
    public role:string
}

export default User

export enum Role {
    USER = 'user',
    Admin = 'admin'
}