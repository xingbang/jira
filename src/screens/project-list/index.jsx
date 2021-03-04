import React, { useState, userEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';

const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])

    userEffect(() => {
        fetch(`${apiUrl}/projects}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])
    userEffect(() => {
        fetch(`${apiUrl}/users}`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])
    return (<div>
        <SearchPanel users={users} setUsers={setUsers} param={param} setParam={setParam}/>
        <List users={users} list={list} setList={setList}/>
    </div>)
}
