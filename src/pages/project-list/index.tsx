import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL

const List = (props: any) => {
    const { state } = useAuth()
    let history = props.history

    useEffect(() => {
        // console.log(state)
        if(!state.name) {
            history.push('/login')
        }
    }, [])

    console.log(state);
    return (<div>
        {
            state.name ? <div>
                登录成功，用户名：{state.name} <br/>
                token: <span style={{wordBreak: 'break-all'}}>{state.token}</span>
            </div> : null
        }
    </div>)
}

export default List
