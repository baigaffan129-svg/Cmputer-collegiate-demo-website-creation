import axios from 'axios'

/**
 * Dev: same-origin `/php-api` → Vite proxy → Apache (avoids CORS & wrong full URL).
 * Prod / override: set VITE_API_URL in .env (build time).
 */
function resolveBaseURL() {
  const fromEnv = import.meta.env.VITE_API_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (import.meta.env.DEV) return '/php-api'
  // Same host as the page (works on phone via http://YOUR_PC_IP/... not localhost)
  return '/Computer_collegiate/server/api'
}

export const api = axios.create({
  baseURL: resolveBaseURL(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const noResponse = !err.response
    const networkish =
      noResponse &&
      (err.code === 'ERR_NETWORK' ||
        err.message === 'Network Error' ||
        err.code === 'ECONNABORTED')
    if (networkish) {
      err.userMessage =
        import.meta.env.DEV
          ? 'API not reachable. Start XAMPP Apache and put this project at htdocs/Computer_collegiate. If Apache uses another port, set VITE_PHP_ORIGIN in client/.env. Do not set VITE_API_URL during npm run dev (the dev server proxies /php-api).'
          : 'Cannot reach the server. Please try again later.'
    }
    return Promise.reject(err)
  },
)

/** Use in form catch blocks after axios errors */
export function getApiErrorMessage(err) {
  return (
    err.userMessage ||
    err.response?.data?.message ||
    err.message ||
    'Something went wrong.'
  )
}

export async function registerStudent(payload) {
  const { data } = await api.post('/register.php', payload)
  return data
}

export async function submitContact(payload) {
  const { data } = await api.post('/contact.php', payload)
  return data
}

export async function checkApiHealth() {
  const { data } = await api.get('/health.php')
  return data
}
