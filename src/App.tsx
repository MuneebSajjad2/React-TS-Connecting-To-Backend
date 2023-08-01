

import React, { useEffect, useState } from 'react'
import axios from 'axios'



interface User {
  id : number,
  name : string
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('');


  useEffect(() => {
    axios
    .get<User[]>('https://jsonplaceholder.typicode.com/xusers')
    .then(res => setUsers(res.data))
    .catch(err => setError(err.message)
    )
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