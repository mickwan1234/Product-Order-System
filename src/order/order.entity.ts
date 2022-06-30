import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('order')
class Order {


	constructor($username: string, $productList: string, $totalPrice: number, $paymentMethod: string) {
		this.username = $username;
		this.productList = $productList;
		this.totalPrice = $totalPrice;
		this.paymentMethod = $paymentMethod;
	}
    
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private username: string;

    @Column({name:'product_list',default:{},nullable:false})
    private productList: string;

    @Column({name:'total_price'})
    private totalPrice: number;

    @Column({name:'payment_method'})
    private paymentMethod: string;


    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Getter $username
     * @return {string}
     */
	public get $username(): string {
		return this.username;
	}

    /**
     * Setter $username
     * @param {string} value
     */
	public set $username(value: string) {
		this.username = value;
	}
        

    /**
     * Getter $productList
     * @return {string}
     */
	public get $productList(): string {
		return this.productList;
	}

    /**
     * Setter $productList
     * @param {string} value
     */
	public set $productList(value: string) {
		this.productList = value;
	}

    /**
     * Getter $totalPrice
     * @return {number}
     */
	public get $totalPrice(): number {
		return this.totalPrice;
	}

    /**
     * Setter $totalPrice
     * @param {number} value
     */
	public set $totalPrice(value: number) {
		this.totalPrice = value;
	}

    /**
     * Getter $paymentMethod
     * @return {string}
     */
	public get $paymentMethod(): string {
		return this.paymentMethod;
	}

    /**
     * Setter $paymentMethod
     * @param {string} value
     */
	public set $paymentMethod(value: string) {
		this.paymentMethod = value;
	}


}

export default Order;