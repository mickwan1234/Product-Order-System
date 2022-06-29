import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Product {
    @PrimaryGeneratedColumn()
    public id:number;

    @Column()
    public name: string;

    @Column()
    public description:string;

    @Column()
    public price: number;

    @Column()
    public quantity:number
}

export default Product