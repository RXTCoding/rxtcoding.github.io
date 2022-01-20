import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import {setCart} from '../../redux/cartReducer'
import React from 'react'
import './Dash.css'
const Dash = (props) => {
  const [products, setProducts]= useState([])
  const {user}= useSelector((store)=>store.authReducer)
  const {cart}= useSelector((store)=>store.cartReducer)
  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get('/api/products')
    .then((res)=>{
      setProducts(res.data)
      console.log(res.data,"this is res data on products.js")
    }).catch(err=> console.log(err))
  }, [])

  const handleAddToCart = (product_id)=> {
    console.log(product_id)
    console.log(cart)
    const product = cart.find((product)=> product.product_id=== product_id)
    console.log(product,'this is the product')
    if(!product){
      console.log(product)
      axios.put(`/api/additem/${product_id}`)//<---mycart
      .then((res)=>{
        dispatch(setCart(res.data))
      }).catch((err)=>{
        console.log(err)
        if(err.response.status===511){
          props.history.push('/auth')
        }
      })
    }else{
      axios.put(`/api/newquantity/${product_id}`, {quantity: product.quantity+1})
      .then((res)=>{
        dispatch (setCart(res.data))
      }).catch(err=>{
        console.log(err)
        if (err.response.status=== 511){
          props.history.push('/auth')
        }
      })
    }
  }
  return(
    
    <div className='dashContainer'>
      <h1>Welcome to <br/> Shida's Broom Closet<img height='50px' width='50px' src="https://media.giphy.com/media/fo2dhRTmaULbStoFkX/giphy.gif" alt='sparkle'/></h1>
      <div className='prodSerImgParent'>
            <img className="dashImg" width='30%' height='40%' src='https://shidas-broom-closet.s3.us-east-2.amazonaws.com/Book+a+Reading.PNG' alt='book a reading'/>
            <img className="dashImg" width='30%' height='40%' src='https://media.giphy.com/media/fUGNY6HT4yc3gURBaW/giphy.gif' alt=' book a yoga session'/>
            <img className="dashImg" width='30%' height='40%' src='https://shidas-broom-closet.s3.us-east-2.amazonaws.com/book+a+sound+SQR.PNG' alt= ' book a sound healing session'/>
            </div>
      {products.map((product)=>{
        return(
          <section className='dashParentDiv'>
            <div className='dashContainer' key={product.product_id}>
              <div className='dashImgChildDiv'>
              <img className='dashImg' width='50%' height='60%' src={product.product_image} alt={product.product_name}/>
              <div className='prodTextContainer'>
              <h2 className='dashName'>{product.product_name}</h2>
              <p className='dashDescription'>{product.product_description}</p>
              <p className='dashPrice'>${product.price}</p>
              </div>
              <button className='dashButton' onClick={()=> handleAddToCart(product.product_id)}>Add To Cart</button>
              </div>
            </div>
            </section>
          )
        })
      }
    </div>
  )
}
export default Dash