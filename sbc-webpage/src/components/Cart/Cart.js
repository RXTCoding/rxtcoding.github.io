import {useEffect} from 'react'
import {setCart} from '../../redux/cartReducer'
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import './Cart.css'
import axios from 'axios'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = (props) => {
  const {cart}= useSelector((store)=>store.cartReducer)
  console.log(cart, "this is cart form useSelector")
  const dispatch= useDispatch()

  useEffect(()=>{
    axios.get('/api/mycart')
    .then((res)=>{
      console.log(res.data)
      dispatch(setCart(res.data))
    }).catch(err=>{
      console.log(err)
      if(err.response.status===511){
        props.history.push('/auth')
      }
    })
  },[dispatch, props.history]) //<-- dispatch not working

  const handleDeleteFromCart = (product_id)=>{
    axios.delete(`/api/delete/${product_id}`)
    .then((res)=>{
      console.log(res.data)
      dispatch (setCart(res.data))
    }).catch(err=>{
      console.log(err)
      if(err.response.status===511){
        props.history.push('/auth')
      }
    })
  }
  const handleChangeQty= (product_id,quantity)=>{
    console.log(quantity, "this quantity is from Cartjs")
    if (quantity <= 0){
      handleDeleteFromCart(product_id)
    }else{
      axios.put(`/api/newquantity/${product_id}`, {quantity})
      .then(res=>{
        dispatch(setCart(res.data))
      }).catch(err=>{
        console.log(err)
        if(err.response.status===511){
          props.history.push('/auth')
        }
      })
    }
  }

  toast.configure()
  const notify= ()=>{
    toast('Hey Love, Thanks for your purchase. your items will be shipped in the next 2-3 business days!')
  }

  return(
    <div className='cartParentDiv'>
      <h1 className='cartH1'><img height='60px' width='60px' src='https://media.giphy.com/media/kcB9s9TNzzyLPgcrVX/giphy.gif' alt='crystal'/>My Cart<img height='60px' width='60px' src='https://media.giphy.com/media/L40qwPexZfBJLqSBaA/giphy.gif' alt='crystal'/></h1>
      {cart.map((product)=>{
        return(
          <div className='cartCkOutContainer' key={product.product_cart_id}>
            <img className='cartImg' width='100px' height='150px' src={product.product_image} alt={product.product_name}/>
            <h4 className='cartH4'>{product.product_name}</h4>
            <h5> Qty: {product.quantity}</h5>
            <button className='cartButton' onClick={()=> handleChangeQty(product.product_id,product.quantity - 1)}>-</button>
            <button className='cartButton' onClick={()=>handleDeleteFromCart(product.product_id)}>X</button>
            <button className='cartButton' onClick={()=> handleChangeQty(product.product_id, product.quantity + 1)}>+</button>
          </div>
        )
      })}
      <p> Total: </p>
      <button className='chkOutBttn' onClick={notify}> Check Out</button>
    </div>
  )
}

export default Cart