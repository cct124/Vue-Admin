import router from './router/index'
import { asyncRouterMap } from './router/index'


router.beforeResolve((to, from, next) => {

  if (JSON.parse(sessionStorage.getItem('Logininformation'))) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    }else {
      if ( !JSON.parse(sessionStorage.getItem('addRoutes')) ) {
        router.addRoutes(asyncRouterMap)
        sessionStorage.setItem('addRoutes', JSON.stringify(asyncRouterMap))
        next({ ...to, replace: true })
      }else {
        next()
      }
    }
  } else {
    next()
  }

})
