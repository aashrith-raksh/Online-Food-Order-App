export default function CartItem({name, quantity, price, onIncrease, onDecrease}){
    return <li className="cart-item">
        <p>{name} - {quantity} x {price}</p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <button>{quantity}</button>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}