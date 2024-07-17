
import React, { useEffect, useState } from 'react';
import supabase from '../supaBaseClient';

const UserSession = () => {
  

  return (
    <div>
      {user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}
    </div>
  );
};

export default UserSession;
