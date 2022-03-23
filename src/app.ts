import express, { Application } from 'express'
import { Env } from './keys'

// 🤞🏻Init
const app: Application = express()

// 🛠 Settings
app.set('port', Env.PORT || 8080)

// 🚀 Start
app.listen(app.get('port'), () => {
  console.log(`Server listen in port : ${app.get('port')}`)
})
