import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from './api/api';
import '../styles.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((response) => setUsers(response.data));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <Link to="/new"><button>Create New User</button></Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>P5 Balance</th>
            <th>Reward Balance</th>
            <th>Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.p5_balance}</td>
              <td>{user.reward_balance}</td>
              <td><Link to={`/${user.id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
