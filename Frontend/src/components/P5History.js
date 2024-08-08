import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getP5History, deleteP5Transaction } from './api/api';
import '../styles.css';

const P5History = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getP5History(id).then((response) => setHistory(response.data));
  }, [id]);

  const handleDelete = (transactionId) => {
    deleteP5Transaction(transactionId).then(() => {
      setHistory(history.filter((item) => item.id !== transactionId));
    });
  };

  return (
    <div>
      <h1>P5 History</h1>
      <Link to={`/${id}/rewards/new`}><button>Create New Reward</button></Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>P5 Given</th>
            <th>User Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{new Date(item.date_time).toLocaleString()}</td>
              <td>{item.points}</td>
              <td>{item.userName}</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P5History;
