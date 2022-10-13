
import app from './app'
import { startConnection } from './config/database'

async function main () {
  // Mongo
  await startConnection()

  // 🚀 Start
  await app.listen(app.get('port'))
  console.log('👂 Server on port', app.get('port'))
}

main()
