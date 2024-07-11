
import React, { useEffect, useState } from 'react';
import supabase from '../supaBaseClient';

const UserSession = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? null);

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <div>
      {user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}
    </div>
  );
};

export default UserSession;
