import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, ConfigProvider } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { Redirect, Route, Switch } from 'react-router-dom'
import zhCN from 'antd/lib/locale/zh_CN'
import { Routes } from '../routes'

import './index.less'

const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu

const LayoutDefault = (props: any) => {
  const [collapsed, setCollapsed] = useState(false)
  console.log(props);

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const handleClick = (e: any) => {
    console.log('click ', e);
    props.history.push(`/${e.key}`)
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="layout-main" style={{ height: 'auto', minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="layout-tit" >管理系统</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['user']} onClick={handleClick} >
            <SubMenu key="books" icon={<MailOutlined />} title="书籍">
              <Menu.Item key="hotBook">热门书籍</Menu.Item>
            </SubMenu>
            <Menu.Item key="user">用户列表</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Breadcrumb style={{ margin: '16px' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>公告</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: '0 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              {
                Routes.map(router => (
                  <Route
                    exact={!router.notExect}
                    key={router.path}
                    path={router.path}
                    component={router.component}
                  >
                  </Route>
                ))
              }
              <Redirect from="/" to="/login" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Made with ❤ by xingbang</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default LayoutDefault