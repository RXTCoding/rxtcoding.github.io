import './App.css';
import routes from './routes'
import Header from './components/Header/Header'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setUser} from './redux/authReducer'
import {setCart} from './redux/cartReducer'
import axios from 'axios'
import Footer from './components/Footer/Footer'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('/api/me').then(res => {
      console.log(res.data.user)
      dispatch(setUser(res.data.user))
      dispatch(setCart(res.data.cart))
    }).catch((err) => {
      console.log(err.response)
    })
  }, [])
  return (
    <div className="App">
      <Header/>
      {routes}
      <Footer/>
    </div>
  )
}

export default App;
