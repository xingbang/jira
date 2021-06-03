import React, { FormEvent } from 'react'
import { login } from '../../untils/auth'
import { useAuth } from '../../context/auth-context'
import * as auth from '../../untils/auth'

const apiUrl = process.env.REACT_APP_API_URL

const Login = (props: any) => {
  
  const { state, dispath } = useAuth()
  console.log(props)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const account = (event.currentTarget.elements[0] as HTMLInputElement).value
    const secret = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({account, secret}).then(() => {
      dispath({ 
        type: 'success',
        payload: {
          name: auth.getToken('SET_NAME'),
          token: auth.getToken('SET_TOKEN')
        }
      });
      props.history.push('/list')
    })
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">用户名</label>
      <input type="text" id={'username'} />
    </div>
    <div>
      <label htmlFor="password">密码</label>
      <input type="password" id={'password'} />
    </div>
    <button type={"submit"}>登录</button>
  </form>
}


export default Login