/**
 * Public URL for phones / other networks when PC only has phone USB tether.
 * Run: npm run dev   (other terminal)
 * Then: npm run share
 */
import localtunnel from 'localtunnel'

const port = Number(process.env.SHARE_PORT || 5173)

const tunnel = await localtunnel({
  port,
  local_host: '127.0.0.1',
})

console.log('\n  Tunnel ready — kisi bhi phone / network se yeh URL kholo:\n')
console.log('  ', tunnel.url)
console.log('\n  Pehle doosri terminal mein "npm run dev" chal raha ho.')
console.log('  XAMPP Apache bhi on rakho (forms/API ke liye).\n')

tunnel.on('close', () => process.exit(0))

const shutdown = () => {
  tunnel.close()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
