import React, {useState, useEffect} from 'react'
import UserListItem from '../components/UserListItem'

export interface UserData {
    id: number;
    name: string;
} 

const UserList = () => {
    
    let [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    let getUsers = async () => {
        let response = await fetch('/api/users/')
        let data = await response.json()
        console.log(data)
        setUsers(data)
    }

    return (
        <div>
            <div className='notes-list'>
                {users.map((user: UserData, index) => (
                    <UserListItem key={index} user={user}/>
                ))}
            </div>
        </div>
    ); 
}

export default UserList