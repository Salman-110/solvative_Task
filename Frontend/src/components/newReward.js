import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers, createRewardTransaction, getUserById } from './api/api';
import '../styles.css';

const NewReward = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [points, setPoints] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const history = useNavigate();

  useEffect(() => {
    getUsers().then((response) => setUsers(response.data));
    getUserById(id).then((response) => setCurrentUser(response.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (points > 100 || points > currentUser.p5_balance) return;

    createRewardTransaction({ points, givenBy: id, givenTo: selectedUser })
      .then(() => history.push(`/${id}/rewards`))
      .catch(console.error);
  };

  return (
    <div>
      <h1>New Reward</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Reward To:
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
            <option value="">Select User</option>
            {users.filter(user => user.id !== id).map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <label>
          Points:
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            min="1"
            max="100"
            required
          />
        </label>
        <p>Current P5 Balance: {currentUser.p5_balance}</p>
        <button type="submit" disabled={points > 100 || points > currentUser.p5_balance}>Submit</button>
        <button type="button" onClick={() => history.push(`/${id}/rewards`)}>Cancel</button>
      </form>
    </div>
  );
};

export default NewReward;
