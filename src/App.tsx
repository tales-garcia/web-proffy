import React, { useState } from 'react';
import Routes from './routes';

export interface Teacher {
  _id: string,
  name: string,
  avatar: string,
  subject: string,
  bio: string,
  cost: string,
  whatsapp: string,
}

function App() {
  const [user, setUser] = useState<Teacher>({
    _id: '',
    name: '',
    avatar: '',
    subject: '',
    bio: '',
    cost: '',
    whatsapp: ''
  });

  function handleUser(user: Teacher) {
    setUser(user);
    console.log(user)
  }
  return (
    <div>
      <Routes onUserEntry={handleUser} user={user} />
    </div>
  );
}

export default App;
