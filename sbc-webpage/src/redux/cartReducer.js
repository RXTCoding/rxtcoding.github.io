const initialState={
    cart:[]
}

const SET_CART="SET_CART"

 export function setCart(cart){
     console.log(cart, 'this is the cart from redux')
     return{
         type: SET_CART,
         payload: cart
     }
 }

export default function cartReducer (state= initialState, action){
    console.log(action.payload, "this is from redux")
    switch (action.type){
        case SET_CART:
            return{...state, cart: action.payload}
        default:
            return{...state}
    }
}