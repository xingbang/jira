import React, { useEffect, useReducer } from 'react'
import { message, Table, Button, Modal, Form, Input } from 'antd'
// import { useAuth } from '../../context/auth-context'
import { getBootHot, creatHotBook, deleteHotBook } from './../../api/book'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useAsync } from '../../utils/useAsync'

// const apiUrl = process.env.REACT_APP_API_URL

const List = (props: any) => {
    // const { state } = useAuth()
    // let history = props.history

    const initState = {
        isQuery: '',
        isModalVisible: false,
        selectData: [],
        listQuery: {
            page: 1,   // 当前页数
            limit: 10,  // 每页条数
        },
        temp: {
            id: '',
            index: '',
            title: '',
            author: '',
            image: ''
        }
    }
    const reducer = (state: any, action: any) => {
        switch (action.type) {
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

    const { isQuery, listQuery, isModalVisible } = state

    const [form] = Form.useForm();

    const { run, isLoading, data: list } = useAsync<any>()


    useEffect(() => {
        run(getBootHot(listQuery)).then(res => {
            console.log(res)
        })
    }, [listQuery, isModalVisible, isQuery, run])

    // add
    const handleAdd = () => {
        dispatch({
            type: 'success',
            payload: {
                isModalVisible: true
            }
        })
    }

    const handleCancel = () => {
        dispatch({
            type: 'success',
            payload: {
                isModalVisible: false
            }
        })
    }

    const handleOk = () => {
        creatHotBook(form.getFieldsValue()).then((res: any) => {
            if (res.data.error_code === 0) {
                // success
                message.success(res.data.msg);
                dispatch({
                    type: 'success',
                    payload: {
                        isModalVisible: false
                    }
                })
            }
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

    const deleteRow = (index: number): void => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除这条数据？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                deleteHotBook(index).then(res => {
                    if (res.data.error_code === 0) {
                        // success
                        message.success(res.data.msg);
                        dispatch({
                            type: 'success',
                            payload: {
                                isQuery: res.data.request
                            }
                        })
                    }
                })
            },
        });
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
                        <img alt='' src={render.image} style={{ width: '40px' }} />
                    </>
                )
            }

        },
        {
            title: '操作',
            dataIndex: 'opeartion',
            render: (_: any, render: any) => {
                return (
                    <>
                        <div onClick={() => { deleteRow(render.index) }}>删除</div>
                    </>
                )
            }

        }
    ]

    // const options = selectData.map((d: any) => <Select.Option key={d.id} value={d.title}>{d.title}</Select.Option>);

    return (<div>
        {/* {
            state.name ? <div>
                登录成功，用户名：{state.name} <br/>
                token: <span style={{wordBreak: 'break-all'}}>{state.token}</span>
            </div> : null
        } */}

        <Button type="primary" onClick={handleAdd}>新增</Button>
        <Table
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={list?.data.result || []}
            pagination={{
                total: list?.data.meta.total || 0,
                current: listQuery.page,
                pageSize: listQuery.limit,
                onChange: onChange,
                pageSizeOptions: ['10', '20', '30'],
                showSizeChanger: true,
                showQuickJumper: true
            }}
            style={{
                paddingTop: '24px'
            }}

        />
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form}>
                <Form.Item
                    label="图书id"
                    name="id"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="请输入图书id" />
                </Form.Item>
                <Form.Item
                    label="图书名称"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="请输入图书名称" />
                </Form.Item>
                <Form.Item
                    label="图书作者"
                    name="author"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="请输入图书作者" />
                </Form.Item>
                <Form.Item
                    label="缩略图"
                    name="image"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="请输入封面url" />
                </Form.Item>
            </Form>
        </Modal>

    </div>)
}

export default List
