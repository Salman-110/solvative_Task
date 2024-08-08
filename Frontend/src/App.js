import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/userLists';
import ViewUser from './components/viewUser';
import P5History from './components/P5History';
import RewardHistory from './components/RewardHistory';
import NewReward from './components/newReward';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/:id" element={<ViewUser />} />
        <Route path="/:id/p5" element={<P5History />} />
        <Route path="/:id/rewards" element={<RewardHistory />} />
        <Route path="/:id/rewards/new" element={<NewReward />} />
      </Routes>
    </Router>
  );
}

export default App;
