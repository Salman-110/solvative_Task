import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById } from './api/api';
import '../styles.css';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  const history = useNavigate();

  React.useEffect(() => {
    getUserById(id).then((response) => setUser(response.data));
  }, [id]);

  return (
    <div>
      <h1>View User</h1>
      <form>
        <label>
          Name:
          <input type="text" value={user.name} readOnly />
        </label>
        <button type="button" onClick={() => history.push(`/${id}/p5`)}>View P5 Balance</button>
        <button type="button" onClick={() => history.push(`/${id}/rewards`)}>View Reward Balance</button>
      </form>
      <Link to="/">Back to User List</Link>
    </div>
  );
};

export default ViewUser;
