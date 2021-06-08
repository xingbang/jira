import React, { useState, useEffect, useReducer } from 'react'
import { Select, Table, Button, Modal, Form, Input } from 'antd'
import { useAuth } from '../../context/auth-context'
import { getBootHot, getBook } from './../../api/book'
import { render } from '@testing-library/react';

const { Option } = Select

const apiUrl = process.env.REACT_APP_API_URL

const List = (props: any) => {
    // const { state } = useAuth()
    // let history = props.history

    const initState = {
        isModalVisible: false,
        loading: false,
        listData: [],
        selectData: [],
        count: 1,   // 数据总数
        listQuery: {
            page: 1,   // 当前页数
            limit: 2,  // 每页条数
        },
        temp: {
            id: '',
            index: '',
            title: '',
            author: '',
            image: ''
        }
    }
    const reducer = (state: any, action: any) =>  {
        switch(action.type) {
            case 'success':
                return {
                    ...state,
                    ...action.payload
                }
            default: 
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initState)

    const { listQuery, loading, listData, count, isModalVisible, selectData } = state
    
    useEffect(() => {
        // console.log(state)
        // if(!state.name) {
        //     history.push('/login')
        // }
        dispatch({
            type: 'success',
            payload: {
                loading: true
            }
        })

        getBootHot(listQuery).then((res: any) => {
            dispatch({
                type: 'success',
                payload: {
                    loading: false,
                    listData: res.data.result,
                    count: res.data.meta?.total
                }
            })
            
        })

    }, [listQuery])

    

    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i} value={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const handleChange = (value: any) => {
        console.log(`selected [${value}]`);
    }

    const handleSearch = (value: string) => {
        let params = {
            q: value,
            start: 1,
            count: 20
        }
        getBook(params).then((res: any) => {
            console.log(res)
        })
    }

    // 分页change
    const onChange = (page: number, pageSize?: number) => {
        dispatch({
            type: 'success',
            payload: {
                listQuery: {
                    page: page,    // 当前页数
                    limit: pageSize,  // 每页数据
                }
            }
        })
        
    }

    const columns = [
        {
            title: '图书序号',
            dataIndex: 'id',
            width: 200
        },
        {
            title: '书名',
            dataIndex: 'title',
            width: 200
        },
        {
            title: '作者',
            dataIndex: 'author',
            width: 200
        },
        {
            title: '点赞数',
            dataIndex: 'count'
        },
        {
          title: '封面',
          dataIndex: 'image',
          render: (_: any, render: any) => {
           return (
            <>
                <img src={render.image} style={{width: '40px'}} />
            </>
           )
          }

        },
    ]

    const options = selectData.map((d: any) => <Select.Option key={d.id} value={d.title}>{d.title}</Select.Option>);

    return (<div>
        {/* {
            state.name ? <div>
                登录成功，用户名：{state.name} <br/>
                token: <span style={{wordBreak: 'break-all'}}>{state.token}</span>
            </div> : null
        } */}
    
    <Button type="primary">新增</Button>
    <Select mode="tags" showArrow style={{minWidth: '150px', width: 'auto' }} placeholder="请选择（多选）" onChange={handleChange}>
        {children}
    </Select>
    <Table 
        rowKey="id"
        loading={loading}
        columns={columns} 
        dataSource={listData} 
        pagination ={{ 
            total: count, 
            current: listQuery.page, 
            pageSize: listQuery.limit,
            onChange: onChange, 
            pageSizeOptions: ['2', '4', '5'],
            showSizeChanger: true, 
            showQuickJumper: true
        }} 
        style={{
            paddingTop: '24px'
        }}
        
    />
    <Modal title="Basic Modal" visible={isModalVisible}>
        <Form>
            <Form.Item
                label="图书名称"
                name="title"
                rules={[{ required: true}]}
            >
                <Select 
                    showSearch
                    onSearch={handleSearch}
                    onChange={handleChange}
                    placeholder="请输入图书名称或作者" >
                    {options}
                </Select>
            </Form.Item>
            <Form.Item
                label="图书作者"
                name="author"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="缩略图"
                name="image"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                {/* <img src={temp.image} height="100"/> */}
            </Form.Item>
        </Form>
    </Modal>
 
    </div>)
}

export default List
