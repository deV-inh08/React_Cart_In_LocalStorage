import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeItems from "../data/items.json"
import { Stack, Button} from 'react-bootstrap'
import { formarCurrency } from '../util/formatCurrency'


type CartItemProps = {
    id: number,
    quantity: number
}

export const CartItem = ({id, quantity}: CartItemProps) => {
    const {removeFromCart} = useShoppingCart();
    const item = storeItems.find((item) => item.id === id);
    if(item === null) return null
  return (
    <Stack direction='horizontal' gap={2} className='d-fle align-items-center'>
        <img src={item?.imgUrl} alt="ImageItem" style={{width: "125px", height: "75px", objectFit: "cover"}} />
        <div className='me-auto'>
            <div>
                { item?.name }
                { quantity > 1
                 && (
                    <span className='text-muted' style={{fontSize: ".65rem"}}>x{quantity}</span> 
                 )
                }
            </div>
            <div className='text-muted' style={{fontSize: ".75rem"}}>
                {formarCurrency(item?.price * quantity)}
                <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
            </div>
        </div>
    </Stack>
)
}
