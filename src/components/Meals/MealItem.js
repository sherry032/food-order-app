import MealItemForm from "./MealItemForm"
import { useContext } from "react"
import CartContext from "../store/cart-context"
import classes from "./MealItem.module.css"
const MealItem = props => {
    const price = `$ ${props.price.toFixed(2)}`
    const ctx = useContext(CartContext)
    const addOnToCartHandler = (amount)=>{
        ctx.addItem({id: props.id, 
            price: props.price, 
            amount:amount,
            name:props.name})
    }

    return(
    <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.id} addOnToCart={addOnToCartHandler}/>
        </div>
    </li>

    )
}

export default MealItem