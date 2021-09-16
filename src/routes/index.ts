import { Login } from '../pages'
import { HotBook } from '../pages'
import { User } from '../pages'

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
const HotBookRouter: RouterType = {
  path: '/hotBook',
  component: HotBook,
  name: '热门图书'
}
const UserRouter: RouterType = {
  path: '/user',
  component: User,
  name: '用户列表'
}

// 总路由
const Routes: RouterType[] = ([
  LoginRouter,
  HotBookRouter,
  UserRouter
])

export {
  Routes
}
