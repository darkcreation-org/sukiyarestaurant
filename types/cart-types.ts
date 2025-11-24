import { IMenuItem } from "./menu-types";

export interface ICartItem extends IMenuItem {
    quantity:number;
    totalAmount:number;
}

export interface CartState{
    items:ICartItem[];
    totalCartAmount:number;
}

export type CartAction = 
| {type: "ADD_ITEM"; payload: ICartItem}
| {type: "REMOVE_ITEM", payload:{id: string}}
| {type: "UPDATE_QUANTITY", payload: {id: string, newQuantity: number}}
| {type: "CLEAR_CART"};


export interface CartContextType extends CartState {
    dispatch : React.Dispatch<CartAction>;
}