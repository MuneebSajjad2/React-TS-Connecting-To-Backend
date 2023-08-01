

import React, { useEffect, useState } from 'react'
import axios from 'axios'



interface User {
  id : number,
  name : string
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])


  useEffect(() => {
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
    .then(res => setUsers(res.data)
    )
  })

  return (
    <div>
      <ul>
        {users.map(user=>  <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  )
}

export default App