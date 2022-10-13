
import app from './app'

async function main () {
  // 🚀 Start
  await app.listen(app.get('port'))
  console.log('👂 Server on port', app.get('port'))
}

main()
