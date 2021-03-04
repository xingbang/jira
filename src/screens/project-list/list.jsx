import React from 'react';

export const List = ({users, list}) => {
    return (<table>
        <tr>
            <th>名称</th>
            <th>负责人</th>
        </tr>
        <tr>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{users.find(user => user.id === project.personId).name}</td>
                </tr>)
            }
        </tr>
    </table>)
}