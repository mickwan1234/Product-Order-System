
export class CartItem {
    public productId: number;

    public quantity: number;
}


export class Cart{

    constructor(username: string, cartItems: CartItem[], totalPrice: number) {
        this.username = username;
        this.cartItems = cartItems;
        this.totalPrice = totalPrice;
    }
       
    public username:string

    
    public cartItems:CartItem[]

    
    public totalPrice:number
}
