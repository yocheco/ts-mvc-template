import express, { Application } from 'express'
import path from 'path'
import { Env } from './keys'

// 🤞🏻Init
const app: Application = express()

// 🛠 Settings
app.set('port', Env.PORT)

// 🧬 Middlewares
app.use(express.static(path.join(__dirname, 'public')))

// 🚀 Start
app.listen(app.get('port'), () => {
  console.log(`Server listen in port : ${app.get('port')}`)
})
