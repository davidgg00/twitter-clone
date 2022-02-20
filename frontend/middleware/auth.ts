import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = (context) => {
  if (process.server) {
    if (
      (context.route.path === '/login' || context.route.path === '/register') &&
      context.req.headers.cookie
    ) {
      context.redirect('/')
    }

    if (!context.req.headers.cookie) {
      context.redirect('/login')
    }
  }
}

export default myMiddleware
