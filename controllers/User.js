const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY || 'SecretKey1234'

// Import User Model
const User = require('../models/User')


// Register
const registerUser = async (req, res) => {

    // if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Already used !'
    })

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })

    // create user
    try {
        const saveUser = await user.save()
        res.json(saveUser)
    }catch(err){
        res.status(400).json({
            status: res.statusCode,
            message: 'Failed to create a new user'
        })
    }
}


// Login 
const loginUser = async (req, res) => {

    // check email
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({
        status: res.statusCode,
        message: 'Your Email is Wrong!'
    })

    // check password
    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if(!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: 'Your Password is Wrong!'
    })

    // Create token with JWT
    const token = jwt.sign({ _id: user._id }, SECRET_KEY)
    res.header('auth-token', token).json({
        token: token,
        user: user

    })
}

// GET ALL
const getUsers = async (req, res) => {
    try {
        const user  = await User.find()
        res.json({
            users: user,
            total_users: user.length
        })
    }catch(err){
        res.json({message: err})
    }
}

// GET ONE  
const getUserOne = async (req, res) => {
    try {
        const user  = await User.findById({_id: req.params.userId})
        res.json(user)
    }catch(err){
        res.json({message: err})
    }
}

// CREATE
const createUser = async (req, res) => {

    // if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Already used !'
    })

    const userPost = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    try {
        const user = await userPost.save()
        res.json(user)
    }catch(err){
        res.json({message: err})
    }
}

// UPDATE
const updateUser = async (req, res) => {

    // if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Already used !'
    })

    try{
        const userUpdate = await User.updateOne({_id: req.params.userId}, {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        })
        const user  = await User.findById({_id: req.params.userId})
        res.json(user)
    }catch(err){
        res.json({message: err})
    }
}

// DELETE
const deleteUser = async (req, res) => {
    try{
        const userUpdate = await User.deleteOne({_id: req.params.userId})
        res.json({message: 'User successfully deleted !'})
    }catch(err){
        res.json({message: err})
    }
}

module.exports = { registerUser, loginUser, getUsers, getUserOne, createUser, updateUser, deleteUser }