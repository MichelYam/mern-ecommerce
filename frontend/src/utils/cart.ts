
/**
 * 
 * @param cart Array of objet
 * @returns(int) total price of the shopping cart
 */
export const calculateCartTotal = (cart: any) => {
    const cartItems = cart;
    
    let total = 0;

    cartItems.map((item: { price: number; quantity: number; }) => {
        total += item.price * item.quantity;

    });
    total = parseFloat(total.toFixed(2));
    localStorage.setItem("cart_price", JSON.stringify(total));
    return total
};