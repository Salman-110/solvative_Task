import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUserById, createUser, updateUser } from './api/api';
import '../styles.css';

const UserForm = () => {
  const [name, setName] = useState('');
  const { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    if (id) {
      getUserById(id).then((response) => setName(response.data.name));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name };
    const apiCall = id ? updateUser(id, data) : createUser(data);
    apiCall.then(() => history.push('/')).catch(console.error);
  };

  return (
    <div>
      <h1>{id ? 'Edit User' : 'New User'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={() => history.push('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
