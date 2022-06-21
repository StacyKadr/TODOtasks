import React from 'react'
import {Link} from 'react-router-dom'

const TODOItem = ({item}) => {
    return (
        <tr>
            <td><Link to={`TODOs/${item.id}`}>{item.id}</Link></td>
            <td>{item.description}</td>
            <td>{item.created}</td>
            <td>{item.project}</td>
            <td>{item.user}</td>
        </tr>
    )
}

const TODOList = ({items}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>DESCRIPTION</th>
                <th>CREATED</th>
                <th>PROJECT</th>
                <th>USER</th>
            </tr>
            {items.map((item) => <TODOItem item={item} />)}
        </table>
    )
}
    
export default TODOList