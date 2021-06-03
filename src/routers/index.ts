import { Login } from './../pages'
import { List } from './../pages'

export type RouterType = {
  path: string,
  component: React.LazyExoticComponent<any>,
  root: string[],
  notExect?: boolean
}

const LoginRouter: RouterType = {
  path: '/login',
  component: Login,
  root: []
}
const ListRouter: RouterType = {
  path: '/list',
  component: List,
  root: []
}

// 总路由
const Routers: RouterType[] = ([
  LoginRouter,
  ListRouter
])

export {
  Routers
}
