import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createUser, signIn } from './handlers/user'

const app = express()


const customLogger = (message: string) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`Custom Log : ${message}`)
    next()
}

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // allows client to send json data to server
app.use(express.urlencoded({ extended: true })) // converts url encoded data to json
app.use(customLogger('Middleware 1'))

app.get('/', customLogger('Middleware /'), (req, res) => {
    console.log('Hello from Express in console!')
    res.status(200)
    res.send('Hello from Express in browser!')
    //res.sendFile('index.html', { root: __dirname })
})

app.use('/api', protect, router)

app.post('/user', createUser)
app.post('/signin', signIn)

export default app