import React from 'react'
import { Navbar as NavbarBs, Container, NavLink, Nav, Button } from "react-bootstrap"
import { useShoppingCart } from '../../context/ShoppingCartContext';

const Navbar = () => {
    const { openCart, cartQuantity } = useShoppingCart()
    return (
        <NavbarBs style={{ height: "70px" }} className='bg-white shadow-sm mb-3' sticky='top'>
            <Container>
                <Nav className='me-auto'>
                    <Nav.Link to='/' as={NavLink}>Home</Nav.Link>
                    <Nav.Link to='/about' as={NavLink}>About</Nav.Link>
                    <Nav.Link to='/store' as={NavLink}>Store</Nav.Link>
                </Nav>
                {
                    cartQuantity > 0 &&
                    <Button
                        onClick={openCart}
                        style={{ width: "3rem", height: "3rem", position: "relative" }}
                        variant='outline-primary'
                        className='rounded-circle text-center'>
                        <img className='center-block hover-text-white' width="25" height="25" src="https://img.icons8.com/fluency-systems-regular/50/shopping-cart--v1.png" alt="shopping-cart--v1" />
                        <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center' style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", bottom: "0", right: "0", transform: "translate(25%, 25%)" }}>
                            {cartQuantity}
                        </div>
                    </Button>
                }
            </Container>
        </NavbarBs>
    )
};
export default Navbar;