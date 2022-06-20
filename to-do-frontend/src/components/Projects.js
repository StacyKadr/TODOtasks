import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td><Link to={`project/${item.id}`}>{item.id}</Link></td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.user}</td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>USER</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
    
export default ProjectList