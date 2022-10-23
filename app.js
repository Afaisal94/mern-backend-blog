const express = require('express')
const app = express()
const mongoose = require('mongoose')
// require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5000
const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017/db_blog'

// Middleware
app.use(express.static('uploads'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.text())


// Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const postgenRoutes = require('./routes/postGenerator')

app.get('/', (req, res) => {
    res.send('Index App')
})
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/postgenerator', postgenRoutes)

// Connect DB
mongoose.connect(DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
let db = mongoose.connection

db.on('error', console.error.bind(console, 'Database connection failed'))
db.once('open', () => {
    console.log('Database connection successful')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

module.exports = app