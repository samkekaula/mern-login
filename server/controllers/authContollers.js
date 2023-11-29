const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')


const test = (req, res) =>{
    res.json('test is working')
}

//register endpoint
const registerUser= async (req, res) =>{
    try {
        const {name, email, password} = req.body
        //check if name was entered
        if(!name){
            return res.json({
                error: 'name is required'
            })
        }
        // check if password is good
        if(!password || password.length < 6){
            return res.json({
                error: ' Password is required and should br at least 6 characters long'
            })
        }
        // check email
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error:'Email already exist'
            })
        }
        const hashedPassword = await hashPassword(password)
        //create user in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
        
    }
}
//Login endpoint
const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }

        //chexk id passsword match
        const match = await comparePassword(password, user.password)
        if(match){
            res.json('password match')
        }
        if(!match){
            res.json({
                error:"Passwords do not match"
            })
        }
    } catch (error) {
        console.log(error)
        
    }

}

module.exports = {
    test,
    registerUser,
    loginUser
}