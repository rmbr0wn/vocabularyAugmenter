import React, { useState } from 'react';

export default function Profile () {
  const[user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  console.log(user);

    return (
      <div>
        <p> Welcome to your profile {user.result.email}!</p>
      </div>
    );
}
