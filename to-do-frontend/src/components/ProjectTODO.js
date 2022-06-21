import React from 'react'
import { useParams } from 'react-router-dom'

const TODOItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.description}</td>
            <td>{item.project.name}</td>
            <td>{item.created}</td>
        </tr>
    )
}

const TODOList = ({items}) => {
    let { id } = useParams();
    let filtered_items = items.filter((item) => item.project.id == id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>DESCRIPTION</th>
                <th>PROJECT</th>
                <th>CREATED</th>
            </tr>
            {filtered_items.map((item) => <TODOItem item={item} />)}
        </table>
    )
}

export default TODOList
