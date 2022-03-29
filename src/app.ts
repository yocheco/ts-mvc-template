import path from 'path'
import cookieParser from 'cookie-parser'
import express, { Application } from 'express'
import { engine } from 'express-handlebars'
import actuator from 'express-actuator'
// Import Env
import { Env } from './keys'
// Import Routes
// -backend
import indexRoutesBackend from './routes/backend/index'

// 🤞🏻Init
const app: Application = express()

// 🛠 Settings
app.set('port', Env.PORT)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
  extname: '.hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials')
}))
app.set('view engine', '.hbs')

// 🧬 Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(actuator())

// 🔀 Routes
// -admin
app.use('/admin', indexRoutesBackend)

// 🚀 Start
app.listen(app.get('port'), () => {
  console.log(`Server listen in port : ${app.get('port')}`)
})
