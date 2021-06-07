import { Login } from '../pages'
import { List } from '../pages'

export type RouterType = {
  path: string,
  component: React.LazyExoticComponent<any>,
  name?: string,
  notExect?: boolean
}

const LoginRouter: RouterType = {
  path: '/login',
  component: Login,
  name: '登录'
}
const ListRouter: RouterType = {
  path: '/list',
  component: List,
  name: '用户列表'
}

// 总路由
const Routes: RouterType[] = ([
  LoginRouter,
  ListRouter
])

export {
  Routes
}
