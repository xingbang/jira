// 路由懒加载
import { lazy } from 'react'

const Login = lazy(() => import('./Login'))
const HotBook = lazy(() => import('./HotBook'))
const User = lazy(() => import('./User'))

export {
  Login,
  HotBook,
  User
}
 