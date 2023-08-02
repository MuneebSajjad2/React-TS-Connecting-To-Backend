import apiClient, {CanceledError} from './Services/api-client';
import React, { useEffect, useState } from 'react';



interface User {
  id : number,
  name : string
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    const controller = new AbortController();
    setLoading(true)
    apiClient
    .get<User[]>('/users', {signal : controller.signal})
    .then((res) => {setUsers(res.data), setLoading(false)})
    .catch((err) => {
      if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false)
      })
      

    return () => controller.abort();



  }, [])

  const deleteUser = (user : User) => {
      const orignalUsers = [...users];
      setUsers(users.filter(u => u.id !== user.id))

        apiClient.delete('/users' + user.id)
        .catch((err) => {
          setError(err.message)
          setUsers(orignalUsers)
        })
    }

    const addUser = () => {
      const orignalUsers = [...users];
      const newUser = {id : 0, name : 'Muneeb'}

      setUsers([newUser, ...users])

      apiClient.post('/users', newUser)
      .then(res => setUsers([res.data, ...users]))
      .catch((err)=> {
        setError(err.message)
        setUsers(orignalUsers)
      })

    }

    const updateUser = (user : User) => {
      const orignalUsers = [...users];
      const updatedUser = {...user, name : user.name + '!'}

      setUsers(users.map(u => u.id === user.id ? updatedUser : u))


      apiClient.patch('/users/' + user.id , updatedUser)
      .catch((err) => {
        setError(err.message)
        setUsers(orignalUsers)

      })


    }

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>Add</button>
      <ul className='list-group'>
        {users.map(user=>  <li key={user.id} className='list-group-item d-flex justify-content-between'>{user.name}
        <div >
        <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>Update</button>
        <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
        </div>
        </li>)}
      </ul>
    </div>
  )
}

export default App