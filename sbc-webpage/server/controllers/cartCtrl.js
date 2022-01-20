module.exports={
    getCart: (req,res)=>{
        const db= req.app.get('db')
        const {user}= req.session
        if(!user){
            return res.status(511).send('User not logged in')
        }
        console.log(user)
        db.cart.get_cart_items(user.cart_id).then(cart=>{
            res.status(200).send(cart)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },

    addToCart: (req,res) =>{
        const db= req.app.get('db')
        const {user}= req.session//<-- this is pulling the user info off the logged in session
        const {product_id}=req.params//<-- "product_id must match index js param"
        const {quantity}= req.body //
        if(!user){
            return res.status(511).send('user not logged in')
        }db.cart.add_to_cart(user.cart_id, product_id, quantity)//<-- added quantity param
        .then((cart)=>{
            res.status(200).send(cart)
        }).catch(err =>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    deleteItemFromCart: (req,res)=>{
        console.log('this is delte from cart')
        const db = req.app.get('db')
        const {user}= req.session
        const {product_id}= req.params //<-- anthing that deals with 'id' will be a parameter so use req.params to retrive that info
        if (!user){
            return res.status(511).send('user not logged in')
        } db.cart.delete_item_from_cart(user.cart_id, product_id)
        .then((cart)=>{
            res.status(200).send(cart)
        }).catch(err=>{
            console.log(err)
                res.status(200).send(err)
        })
    },
    changeItemQty:(req,res)=>{
        const db= req.app.get('db')
        console.log(req.session.user,"this is the cartcrtl ln 48")
        const {user}= req.session
        const {product_id}= req.params
        const {quantity}=req.body 
        if(!user){
            res.status(511).send('User is not logged in')
        } db.cart.change_item_qty(user.cart_id,product_id, quantity)
        .then((cartProducts)=>{
            res.status(200).send(cartProducts)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}