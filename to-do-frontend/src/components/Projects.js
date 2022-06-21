import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td><Link to={`project/${item.id}`}>{item.id}</Link></td>
            <td>{item.name}</td>
            <td>{item.user}</td>
        </tr>
    )
}

const ProjectList = ({ items }) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>USER</th>
            </tr>
            {items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}
    
export default ProjectList