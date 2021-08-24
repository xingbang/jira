import React from 'react'
import { Layout, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '../../utils/auth'
import { useAuth } from '../../context/auth-context'
import * as auth from '../../utils/auth'

import './index.less'

// const apiUrl = process.env.REACT_APP_API_URL

const Login = (props: any) => {
  
  const { dispath } = useAuth()

  const onFinish = (value: any) => {
    console.log(value)
    const {account, secret} = value
    // event.preventDefault()
    // const account = (event.currentTarget.elements[0] as HTMLInputElement).value
    // const secret = (event.currentTarget.elements[1] as HTMLInputElement).value
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

  return <Layout>
    <div className="login">
      <div className="login-container">
        <div className="login-header">管理系统</div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="account"
            rules={[{
              required: true,
              message: '用户名不能为空'
            }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="secret"
            rules={[{
              required: true,
              message: '密码不能为空'
            }]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox style={{color: '#fff'}}>记住我</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </Layout>
}


export default Login