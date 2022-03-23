import path from 'path'
import cookieParser from 'cookie-parser'
import express, { Application } from 'express'
// Import Env
import { Env } from './keys'
// Import Routes
import indexRoutes from './routes/index'

// 🤞🏻Init
const app: Application = express()

// 🛠 Settings
app.set('port', Env.PORT)

// 🧬 Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// 🔀 Routes
app.use('/', indexRoutes)

// 🚀 Start
app.listen(app.get('port'), () => {
  console.log(`Server listen in port : ${app.get('port')}`)
})
