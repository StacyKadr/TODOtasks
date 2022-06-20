import React from 'react'
import {Link} from 'react-router-dom'

const UserItem = ({ item }) => {
    return (
        <tr>
            <td><Link to={`user/${item.id}`}>{item.id}</Link></td>
            <td>{item.name}</td>
            <td>{item.birthday_year}</td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Birthday year
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UserList