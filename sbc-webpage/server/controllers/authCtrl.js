const bcrypt= require ("bcryptjs")
const mailer= require('../nodemailer')

module.exports={
    register: async (req,res)=>{
        const db = req.app.get('db')
        const {email, password}= req.body
        const [foundUser]= await db.auth.check_user(email)
        if(foundUser){
            return res.status(409).send('Email already registered')
        }
        const salt= bcrypt.genSaltSync(10)
        const hash= bcrypt.hashSync(password, salt)
        const [user]= await db.auth.register_user(email,hash)
        const [cart]= await db.cart.create_cart(user.sbc_user_id)
        const mailer_result= await mailer(email)
        console.log("this is the sent email",email, mailer_result)
        console.log(user)
        delete user.password
        req.session.user= user
        req.session.user.cart_id= cart
        console.log(cart)
        return res.status(200).send(req.session.user)
    },

    login: async (req,res)=>{
        const db = req.app.get('db')
        const {email, password}= req.body 
        const [user]= await db.auth.check_user(email) //<--- this has to be user and not foundUser or it will b undefined in the rest of the login code
        if(!user){
            return res.status(401).send ('User not found')
        }
        
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
            return res.status(401).send('User name or password is incorrect')
        }
        
        const [cart]= await db.cart.get_cart(user.sbc_user_id) //<===if erroring check here
        console.log(user)
        delete user.password
        req.session.user=user
        console.log(req.session.user)
        req.session.user.cart_id= cart.cart_id
        return res.status(200).send(req.session.user)
    },

    logout: async(req,res)=>{
        req.session.destroy()
        res.status(200)

    },

    getUser: async(req,res)=>{
        const db = req.app.get('db')
        const {user}= req.session//<-- destructured user
        if(!user){
        return res.status(404).send('user not found')
        }
            db.cart.get_cart_items(user.cart_id).then((cart)=>{
                res.status(200).send({user, cart})
            })
        
    }
}
