import React from 'react'
import {Link} from 'react-router-dom'

const TODOItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td><Link to={`TODOs/${item.id}`}>{item.id}</Link></td>
            <td>{item.description}</td>
            <td>{item.created}</td>
            <td>{item.project}</td>
            <td>{item.user}</td>
            <td><button onClick={()=>deleteTODO(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TODOList = ({items, deleteProject}) => {
    return (
        <div>
        <table>
            <tr>
                <th>ID</th>
                <th>DESCRIPTION</th>
                <th>CREATED</th>
                <th>PROJECT</th>
                <th>USER</th>
                <th></th>
            </tr>
            {items.map((item) => <TODOItem item={item} deleteTODO={deleteTODO} />)}
        </table>
        <Link to='/TODOs/create'>Create</Link>
        </div>
    )
}
    
export default TODOList