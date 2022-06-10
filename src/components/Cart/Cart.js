import Modal from "../UI/Modal"
import CartItem from "./CartItem"
import classes from "./Cart.module.css"
import { useContext, useState } from "react"
import CartContext from "../store/cart-context"
import Checkout from "../Checkout/Checkout"
import useHttp from "../helpers/useHttp"
const Cart = props=>{
    const [isCheckOut, setIsCheckout] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const ctx = useContext(CartContext)
    const totalAmount = `$ ${ctx.totalAmount.toFixed(2)}`
    const hasItems = ctx.items.length > 0
    const cartItemRemoveHandler = (id) =>{
        ctx.removeItem(id)
    }
    const cartItemAddHandler = item =>{
        const newItem = {...item, amount: 1}
        ctx.addItem(newItem)
    }
    const cartItems = <ul className={classes["cart-items"]}>{ctx.items.map(item=>
    <CartItem key = {item.id} price={item.price} name={item.name} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />)}</ul>
    const actionbtns = <div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.closeModal}>Close</button>
    {hasItems && <button className={classes.button} onClick={()=> setIsCheckout(true)}>Order</button>}
    </div>
    const {dataHasError, sendRequest, isLoading} = useHttp()
    const orderSubmitHandler = (userData)=>{
        const orderData = {
            userInfo: userData,
            orderInfo: ctx.items
        }
        sendRequest("https://moviedata-675bb-default-rtdb.firebaseio.com/orders.json", orderData)
        setDidSubmit(true)
        ctx.clear()
    }

    const modalContent =<>
    {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {!isCheckOut && actionbtns}
        {isCheckOut && <Checkout onConfirm={orderSubmitHandler} onCancel={props.closeModal}/>}
        {dataHasError && <p>Order is not Valid</p>}</>

    return<Modal closeModal={props.closeModal}>
        {!didSubmit && !isLoading && modalContent}
        {isLoading && <p>Sending the order..</p>}
        {!isLoading && didSubmit && <p>Your order is submitted!</p>}

    </Modal>
}

export default Cart