import {Offcanvas, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCartGet } from '../store/slices/cart.slice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setCart } from '../store/slices/cart.slice'

const Cart = ({ show, handleClose,setShow })=> {
  
    const dispatch = useDispatch()
    const dispatchGet = useDispatch()
    const cart = useSelector(state =>state.cart)
    let total = 0
    const navigate = useNavigate()
    

    useEffect(() => {
      dispatch(thunkCartGet())
    }, [show])

    const deleteCart = ()=>{
        cart.map((element)=>{
            axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${element.id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
            .then(()=>  dispatchGet(setCart([])))
            .catch(error => console.log(error) )
        })
    }



    const dataUser =      {
        "street": "Green St. 1456",
        "colony": "Southwest",
        "zipCode": 12345,
        "city": "USA",
        "references": "Some references"
    }

    const checkout = (purchases)=>{
        axios
            .post('https://e-commerce-api.academlo.tech/api/v1/purchases', purchases, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( ()=> {
            navigate('/purchase');
            setShow(!show);
            dispatchGet(setCart([]))
        })
        .catch( error => console.log(error) )
    }
    
    // aca se suman los totales del carrito
    let totalShopping = cart.map(product => (parseInt(product.price)))
    totalShopping.map(num => total+=num)



    const deleteElement = (elementId)=>{
        axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${elementId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        .then(()=>  dispatch(thunkCartGet()))
        .catch(error => console.log(error) )
    }
    
    
    return(
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
                {/* Cada producto seleccionado */}
                <Card className='articleSelect'>
                    <div className='body'>
                  {  
                    cart.map((element, index)=>{                
                    return (
                        <Card.Body key={index}>
                        <div className='articles'>
                            <Card.Title className='title'>{element.title}</Card.Title>
                            <button onClick={()=>deleteElement(element.id)} ><i className="fa-solid fa-trash"></i></button>
                        </div>
                        <div className='total'>
                            <Card.Text> <span>Total:</span> {element.price}</Card.Text>
                        </div>
                        </Card.Body>         
                    )
                    })
                  }
                  </div>
                  <Card.Footer>
                {/* total de todos los productos */}
                <div className='totalShopping'>
                    <Card.Title>Total:</Card.Title>
                    <Card.Text> {`$${total.toFixed(2)}`} </Card.Text>
                </div>
                <div className='btn-cart'>
            {
                cart.length !== 0 && <Button onClick={ ()=> checkout(dataUser) }>Checkout</Button>
            }
            {
                cart.length !== 0 && <Button onClick={ ()=> deleteCart() }>All Delete</Button>
            }
             {
                cart.length === 0 && <h2>No hay productos seleccionados</h2>
            }
            </div>
                    </Card.Footer>
                </Card>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default Cart