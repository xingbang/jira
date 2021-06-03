// 路由懒加载
import { lazy } from 'react'

const Login = lazy(() => import('./login'))
const List = lazy(() => import('./project-list'))

export {
  Login,
  List
}
 