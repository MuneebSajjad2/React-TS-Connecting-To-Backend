

import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'



interface User {
  id : number,
  name : string
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchUsers =async () => {
      try {
     const res =   await axios
        .get<User[]>('https://jsonplaceholder.typicode.com/users')
        setUsers(res.data)
        
      } catch (error) {
        setError((error as AxiosError).message)
      }

      
    }
    fetchUsers();
    // .catch(err => setError(err.message)
    // )
  }, [])

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {users.map(user=>  <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  )
}

export default App