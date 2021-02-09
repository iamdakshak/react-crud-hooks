import React, { useEffect, useState } from 'react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import useAsyncRequest from './hooks/useAsyncRequest';
import UserTable from './tables/UserTable';


const App = () => {

  const [data, loading] = useAsyncRequest(3);
  const [users, setUsers] = useState(null);

  useEffect(() => {
      if(data){
          const formattedUsers = data.map((obj, i) => {
              return {
                  id: i,
                  name: obj.name.first,
                  username: obj.name.first + " " + obj.name.last,
              };
          });
          setUsers(formattedUsers);
      }
  }, [data])

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  }

  const deleteUser = id => setUsers(users.filter(user => user.id !== id));

  const [editing, setEditing] = useState(false);
  const initialUser = {id: null, name: '', username: ''};
  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  }

  const updateUser = (newUser) => {
    setUsers(users.map(user => (user.id === currentUser.id ? newUser : user)))
  }


  return (
    <div className="container">
      <h1>React CRUD App with Hooks</h1>
      <div className="row">
        <div className="five columns">
          { editing ? (
            <div>
              <h2>Edit User</h2>
              <EditUserForm currentUser={currentUser}
                            setEditing={setEditing}
                            updateUser={updateUser} />
            </div>
          ) : (
            <div>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </div>
          ) }
        </div>
        { loading || !users ? (
            <p>Loading...</p>
        ) : (
            <div className="seven columns">
                <h2>View User</h2>
                <UserTable users={users} deleteUser={deleteUser} editUser={editUser} />
            </div>
        ) }
      </div>
    </div>
  );
}

export default App;
