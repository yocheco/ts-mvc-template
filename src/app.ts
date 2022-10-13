import path from 'path'
import cookieParser from 'cookie-parser'
import express, { Application } from 'express'
import { engine } from 'express-handlebars'
import { flash } from 'express-flash-message'
import actuator from 'express-actuator'
import morgan from 'morgan'
import setTZ from 'set-tz'
import session from 'express-session'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

// Import Env
import { Env } from './keys'
// Impoer Db
import './database'
// Import Routes
// -backend
import indexRoutesBackend from './routes/backend/index'
import indexRoutesFrontend from './routes/frontend/index'

// 🤞🏻Init
const app: Application = express()

// 🛠 Settings
app.set('port', Env.PORT)

// add time zone
setTZ(Env.TZ)
// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

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

// express-session
// app.use(sessionMiddleware)
app.use(
  session({
    secret: Env.JWT_SECTRET,
    resave: false,
    saveUninitialized: true
  })
)
// Morgan
// dev or common
app.use(morgan('dev'))

app.use(flash({ sessionKeyName: 'flashMessage', useCookieSession: true }))

// 🔀 Routes
// -admin
app.use('/admin', indexRoutesBackend)
app.use('/', indexRoutesFrontend)

export default app
