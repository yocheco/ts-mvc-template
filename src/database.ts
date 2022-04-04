import mongoose from 'mongoose'
import { Env } from './keys'

const options = {
  keepAlive: true
}
const urlDb = `mongodb://${Env.MONGO_USERNAME}:${Env.MONGO_PASSWORD}@${Env.MONGO_HOSTNAME}:${Env.MONGO_PORT}/${Env.MONGO_DB}?authSource=admin`

mongoose.connect((Env.ENV !== 'dev') ? urlDb : Env.MONGOURI, options)
  .then(db => console.log('Mongoose is alive!!!!'))
  .catch(err => console.error(err))
