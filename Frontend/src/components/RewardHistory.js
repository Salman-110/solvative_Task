import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRewardHistory } from './api/api';
import '../styles.css';

const RewardHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getRewardHistory(id).then((response) => setHistory(response.data));
  }, [id]);

  return (
    <div>
      <h1>Reward History</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>Rewards Received</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{new Date(item.date_time).toLocaleString()}</td>
              <td>{item.points}</td>
              <td>{item.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardHistory;
